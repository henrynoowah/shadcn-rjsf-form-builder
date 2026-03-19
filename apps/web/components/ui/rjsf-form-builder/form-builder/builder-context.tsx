import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import { nanoid } from 'nanoid';
import type { FormSchema, FormFieldDefinition, FormFieldType } from '@/registry/form-builder-types/types';

type BuilderState = {
  schema: FormSchema;
  selectedFieldId: string | null;
};

type BuilderAction =
  | { type: 'ADD_FIELD'; payload: { fieldType: FormFieldType; index?: number } }
  | { type: 'REMOVE_FIELD'; payload: { fieldId: string } }
  | { type: 'UPDATE_FIELD'; payload: { fieldId: string; updates: Partial<FormFieldDefinition> } }
  | { type: 'REORDER_FIELDS'; payload: { activeId: string; overId: string } }
  | { type: 'SELECT_FIELD'; payload: { fieldId: string | null } }
  | { type: 'UPDATE_SCHEMA'; payload: Partial<FormSchema> };

const DEFAULT_FIELD_LABELS: Record<string, string> = {
  text: 'Text Field',
  number: 'Number Field',
  email: 'Email Field',
  tel: 'Phone Field',
  select: 'Select Field',
  checkbox: 'Checkbox',
  radio: 'Radio Group',
  date: 'Date Field',
  textarea: 'Text Area',
  file: 'File Upload',
  heading: 'Heading',
  paragraph: 'Enter your text here...',
  separator: '',
};

const createDefaultField = (fieldType: FormFieldType, order: number): FormFieldDefinition => ({
  id: nanoid(8),
  type: fieldType,
  label: { 'en-US': DEFAULT_FIELD_LABELS[fieldType] ?? 'Field' },
  order,
  required: false,
});

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'ADD_FIELD': {
      const { fieldType, index } = action.payload;
      const newField = createDefaultField(fieldType, index ?? state.schema.fields.length);

      const fields = [...state.schema.fields];
      if (index !== undefined) {
        fields.splice(index, 0, newField);
        // Recalculate order
        fields.forEach((f, i) => (f.order = i));
      } else {
        fields.push(newField);
      }

      return {
        ...state,
        schema: { ...state.schema, fields },
        selectedFieldId: newField.id,
      };
    }

    case 'REMOVE_FIELD': {
      const fields = state.schema.fields
        .filter((f) => f.id !== action.payload.fieldId)
        .map((f, i) => ({ ...f, order: i }));

      return {
        ...state,
        schema: { ...state.schema, fields },
        selectedFieldId: state.selectedFieldId === action.payload.fieldId ? null : state.selectedFieldId,
      };
    }

    case 'UPDATE_FIELD': {
      const { fieldId, updates } = action.payload;
      const fields = state.schema.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f));

      return {
        ...state,
        schema: { ...state.schema, fields },
      };
    }

    case 'REORDER_FIELDS': {
      const { activeId, overId } = action.payload;
      const fields = [...state.schema.fields];
      const activeIndex = fields.findIndex((f) => f.id === activeId);
      const overIndex = fields.findIndex((f) => f.id === overId);

      if (activeIndex === -1 || overIndex === -1) return state;

      const [moved] = fields.splice(activeIndex, 1);
      if (!moved) return state;
      fields.splice(overIndex, 0, moved);
      fields.forEach((f, i) => (f.order = i));

      return {
        ...state,
        schema: { ...state.schema, fields },
      };
    }

    case 'SELECT_FIELD':
      return { ...state, selectedFieldId: action.payload.fieldId };

    case 'UPDATE_SCHEMA':
      return {
        ...state,
        schema: { ...state.schema, ...action.payload },
      };

    default:
      return state;
  }
};

type BuilderContextValue = {
  state: BuilderState;
  addField: (fieldType: FormFieldType, index?: number) => void;
  removeField: (fieldId: string) => void;
  updateField: (fieldId: string, updates: Partial<FormFieldDefinition>) => void;
  reorderFields: (activeId: string, overId: string) => void;
  selectField: (fieldId: string | null) => void;
  updateSchema: (updates: Partial<FormSchema>) => void;
  selectedField: FormFieldDefinition | undefined;
};

const BuilderContext = createContext<BuilderContextValue | null>(null);

export const useFormBuilder = (): BuilderContextValue => {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error('useFormBuilder must be used within a BuilderProvider');
  return ctx;
};

const DEFAULT_SCHEMA: FormSchema = {
  id: '',
  title: { 'en-US': 'Untitled Form' },
  fields: [],
};

export type BuilderProviderProps = {
  initialSchema?: FormSchema;
  onChange?: (schema: FormSchema) => void;
  children: ReactNode;
};

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ initialSchema, onChange, children }) => {
  const [state, dispatch] = useReducer(builderReducer, {
    schema: initialSchema ?? DEFAULT_SCHEMA,
    selectedFieldId: null,
  });

  const notifyChange = useCallback((newState: BuilderState) => onChange?.(newState.schema), [onChange]);

  const addField = useCallback((fieldType: FormFieldType, index?: number) => {
    dispatch({ type: 'ADD_FIELD', payload: { fieldType, index } });
  }, []);

  const removeField = useCallback((fieldId: string) => dispatch({ type: 'REMOVE_FIELD', payload: { fieldId } }), []);

  const updateField = useCallback(
    (fieldId: string, updates: Partial<FormFieldDefinition>) =>
      dispatch({ type: 'UPDATE_FIELD', payload: { fieldId, updates } }),
    [],
  );

  const reorderFields = useCallback(
    (activeId: string, overId: string) => dispatch({ type: 'REORDER_FIELDS', payload: { activeId, overId } }),
    [],
  );

  const selectField = useCallback(
    (fieldId: string | null) => dispatch({ type: 'SELECT_FIELD', payload: { fieldId } }),
    [],
  );

  const updateSchema = useCallback(
    (updates: Partial<FormSchema>) => dispatch({ type: 'UPDATE_SCHEMA', payload: updates }),
    [],
  );

  const selectedField = state.schema.fields.find((f) => f.id === state.selectedFieldId);

  // Notify parent of changes
  const prevSchemaRef = { current: state.schema };
  if (prevSchemaRef.current !== state.schema) {
    notifyChange(state);
  }

  return (
    <BuilderContext.Provider
      value={{
        state,
        addField,
        removeField,
        updateField,
        reorderFields,
        selectField,
        updateSchema,
        selectedField,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
