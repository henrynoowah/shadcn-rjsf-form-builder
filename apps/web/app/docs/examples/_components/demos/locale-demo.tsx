'use client';

import { useState } from 'react';
import { FormRenderer } from '@/registry/form-renderer/form-renderer';
import type { FormSchema } from '@/registry/form-builder-types/types';

const schema: FormSchema = {
  id: 'multilingual-demo',
  title: { 'en-US': 'Registration', 'ko-KR': '회원가입', 'ja-JP': '登録' },
  submitLabel: { 'en-US': 'Register', 'ko-KR': '등록하기', 'ja-JP': '登録する' },
  fields: [
    {
      id: 'name',
      type: 'text',
      label: { 'en-US': 'Full Name', 'ko-KR': '이름', 'ja-JP': '氏名' },
      placeholder: { 'en-US': 'John Doe', 'ko-KR': '홍길동', 'ja-JP': '山田太郎' },
      required: true,
      order: 0,
    },
    {
      id: 'email',
      type: 'email',
      // Only en-US label provided — other locales fall back to this value
      label: { 'en-US': 'Email Address' },
      placeholder: {
        'en-US': 'john@example.com (en-US)',
        'ko-KR': 'label falls back → "Email Address"',
        'ja-JP': 'label falls back → "Email Address"',
      },
      required: true,
      order: 1,
    },
  ],
};

type Locale = 'en-US' | 'ko-KR' | 'ja-JP';
const LOCALES: Locale[] = ['en-US', 'ko-KR', 'ja-JP'];

export default function LocaleDemo() {
  const [locale, setLocale] = useState<Locale>('en-US');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Locale:</span>
        {LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              locale === l
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <FormRenderer schema={schema} locale={locale} baseLocale="en-US" />
    </div>
  );
}
