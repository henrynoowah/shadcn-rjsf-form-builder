import type { FormSchema } from '@/registry/form-builder-types/types';

const t = (en: string, ko: string) => ({ 'en-US': en, 'ko-KR': ko });

export type Showcase = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  schema: FormSchema;
};

const jobApplication: FormSchema = {
  id: 'job-application',
  title: t('Job Application', '입사 지원서'),
  description: t('Senior Frontend Engineer · Remote', '시니어 프론트엔드 엔지니어 · 원격 근무'),
  submitLabel: t('Submit Application', '지원서 제출'),
  settings: { showProgressBar: true, nextLabel: t('Next', '다음'), backLabel: t('Back', '이전') },
  fields: [
    { id: 'fullName', type: 'text', label: t('Full Name', '이름'), placeholder: t('Jane Kim', '김지은'), required: true, order: 0 },
    { id: 'email', type: 'email', label: t('Email', '이메일'), placeholder: t('jane@example.com', 'jieun@example.com'), required: true, order: 1 },
    { id: 'phone', type: 'tel', label: t('Phone', '전화번호'), placeholder: t('+1 555 0100', '010-1234-5678'), order: 2 },
    { id: 'page-role', type: 'pagebreak', label: t('The Role', '지원 정보'), description: t('Tell us how you would like to work.', '희망하는 근무 형태를 알려주세요.'), order: 3 },
    {
      id: 'employmentType',
      type: 'radio',
      label: t('Employment Type', '고용 형태'),
      required: true,
      order: 4,
      options: [
        { value: 'full-time', label: t('Full-time', '정규직') },
        { value: 'contract', label: t('Contract', '계약직') },
        { value: 'part-time', label: t('Part-time', '파트타임') },
      ],
    },
    { id: 'startDate', type: 'date', label: t('Earliest Start Date', '입사 가능일'), required: true, order: 5 },
    { id: 'page-docs', type: 'pagebreak', label: t('Documents', '서류'), order: 6 },
    { id: 'resume', type: 'file', label: t('Résumé (PDF)', '이력서 (PDF)'), required: true, order: 7 },
    {
      id: 'coverLetter',
      type: 'textarea',
      label: t('Why this role?', '지원 동기'),
      placeholder: t('A few sentences are enough.', '몇 문장이면 충분합니다.'),
      validation: { maxLength: 500 },
      order: 8,
    },
  ],
};

const patientIntake: FormSchema = {
  id: 'patient-intake',
  title: t('Patient Intake', '초진 문진표'),
  description: t('Please complete before your first visit.', '첫 방문 전에 작성해 주세요.'),
  submitLabel: t('Save', '저장'),
  fields: [
    { id: 'h-personal', type: 'heading', label: t('Personal Details', '기본 정보'), order: 0 },
    { id: 'patientName', type: 'text', label: t('Patient Name', '환자 이름'), required: true, order: 1 },
    { id: 'dob', type: 'date', label: t('Date of Birth', '생년월일'), required: true, order: 2 },
    { id: 'emergencyPhone', type: 'tel', label: t('Emergency Contact', '비상 연락처'), required: true, order: 3 },
    { id: 'sep-1', type: 'separator', label: '', order: 4 },
    { id: 'h-medical', type: 'heading', label: t('Medical History', '병력'), order: 5 },
    {
      id: 'p-privacy',
      type: 'paragraph',
      label: t('Your answers are shared only with your care team.', '작성하신 내용은 담당 의료진에게만 공유됩니다.'),
      order: 6,
    },
    {
      id: 'hasAllergies',
      type: 'radio',
      label: t('Do you have any allergies?', '알레르기가 있으신가요?'),
      required: true,
      order: 7,
      options: [
        { value: 'no', label: t('No', '아니요') },
        { value: 'yes', label: t('Yes', '예') },
      ],
    },
    {
      id: 'allergyDetails',
      type: 'textarea',
      label: t('List your allergies and reactions', '알레르기 종류와 반응을 적어주세요'),
      required: true,
      order: 8,
      condition: { field: 'hasAllergies', operator: 'eq', value: 'yes' },
    },
    { id: 'medications', type: 'textarea', label: t('Current Medications', '복용 중인 약'), order: 9 },
  ],
};

const eventRegistration: FormSchema = {
  id: 'event-registration',
  title: t('Frontend Conf 2026', '프론트엔드 컨퍼런스 2026'),
  description: t('Seoul · November 20', '서울 · 11월 20일'),
  submitLabel: t('Register', '등록하기'),
  fields: [
    { id: 'attendeeName', type: 'text', label: t('Name', '이름'), required: true, order: 0 },
    { id: 'attendeeEmail', type: 'email', label: t('Email', '이메일'), required: true, order: 1 },
    {
      id: 'ticket',
      type: 'select',
      label: t('Ticket', '티켓'),
      required: true,
      order: 2,
      options: [
        { value: 'standard', label: t('Standard', '일반') },
        { value: 'vip', label: t('VIP (dinner included)', 'VIP (만찬 포함)') },
        { value: 'student', label: t('Student', '학생') },
      ],
    },
    {
      id: 'dietary',
      type: 'radio',
      label: t('Dinner Preference', '만찬 메뉴'),
      required: true,
      order: 3,
      condition: { field: 'ticket', operator: 'eq', value: 'vip' },
      options: [
        { value: 'regular', label: t('Regular', '일반식') },
        { value: 'vegetarian', label: t('Vegetarian', '채식') },
        { value: 'vegan', label: t('Vegan', '비건') },
      ],
    },
    {
      id: 'guests',
      type: 'number',
      label: t('Additional Guests', '동반 인원'),
      description: t('Up to 3.', '최대 3명.'),
      defaultValue: 0,
      validation: { min: 0, max: 3 },
      order: 4,
    },
    { id: 'codeOfConduct', type: 'checkbox', label: t('I agree to the code of conduct', '행동 강령에 동의합니다'), required: true, order: 5 },
  ],
};

const feedback: FormSchema = {
  id: 'customer-feedback',
  title: t('How are we doing?', '서비스 만족도 조사'),
  submitLabel: t('Send Feedback', '의견 보내기'),
  fields: [
    {
      id: 'score',
      type: 'number',
      label: t('How likely are you to recommend us? (0–10)', '지인에게 추천할 의향이 있으신가요? (0–10)'),
      required: true,
      validation: { min: 0, max: 10 },
      order: 0,
    },
    {
      id: 'improve',
      type: 'textarea',
      label: t('What could we do better?', '어떤 점을 개선하면 좋을까요?'),
      description: t('Shown for scores below 7.', '7점 미만일 때 표시됩니다.'),
      required: true,
      validation: { minLength: 10 },
      order: 1,
      condition: { field: 'score', operator: 'lt', value: 7 },
    },
    {
      id: 'channel',
      type: 'radio',
      label: t('How did you hear about us?', '어떻게 알게 되셨나요?'),
      order: 2,
      options: [
        { value: 'search', label: t('Search', '검색') },
        { value: 'friend', label: t('A friend', '지인 추천') },
        { value: 'social', label: t('Social media', '소셜 미디어') },
      ],
    },
    { id: 'contactMe', type: 'checkbox', label: t('You may contact me about my answers', '답변 관련 연락을 받겠습니다'), order: 3 },
  ],
};

const bugReport: FormSchema = {
  id: 'bug-report',
  title: t('Report a Bug', '버그 신고'),
  submitLabel: t('File Report', '신고하기'),
  fields: [
    { id: 'summary', type: 'text', label: t('Summary', '요약'), required: true, validation: { maxLength: 80 }, order: 0 },
    {
      id: 'severity',
      type: 'select',
      label: t('Severity', '심각도'),
      required: true,
      order: 1,
      options: [
        { value: 'low', label: t('Low: cosmetic', '낮음: 화면 표시') },
        { value: 'medium', label: t('Medium: workaround exists', '보통: 우회 가능') },
        { value: 'high', label: t('High: blocks my work', '높음: 작업 불가') },
      ],
    },
    {
      id: 'pageUrl',
      type: 'text',
      label: t('Page URL', '페이지 URL'),
      placeholder: t('https://', 'https://'),
      validation: { pattern: '^https?://.+' },
      order: 2,
    },
    {
      id: 'steps',
      type: 'textarea',
      label: t('Steps to Reproduce', '재현 방법'),
      placeholder: t('1. Go to…\n2. Click…', '1. …로 이동\n2. …클릭'),
      required: true,
      order: 3,
    },
    { id: 'screenshot', type: 'file', label: t('Screenshot', '스크린샷'), order: 4 },
  ],
};

const newsletter: FormSchema = {
  id: 'newsletter',
  title: t('Stay in the loop', '소식 받아보기'),
  description: t('One email a month. No spam.', '한 달에 한 번, 스팸 없이.'),
  submitLabel: t('Subscribe', '구독하기'),
  fields: [
    { id: 'subscriberEmail', type: 'email', label: t('Email', '이메일'), placeholder: t('you@example.com', 'you@example.com'), required: true, order: 0 },
    { id: 'productUpdates', type: 'checkbox', label: t('Also send product updates', '제품 업데이트도 받기'), defaultValue: true, order: 1 },
  ],
};

export const SHOWCASES: Showcase[] = [
  { id: 'job-application', title: 'Job Application', description: 'Three pages with a progress bar, a date picker and a file upload.', tags: ['multi-page', 'file', 'date', 'radio'], schema: jobApplication },
  { id: 'patient-intake', title: 'Patient Intake', description: 'Headings, a paragraph and a separator for structure. Allergy details appear only when needed.', tags: ['display fields', 'conditional'], schema: patientIntake },
  { id: 'event-registration', title: 'Event Registration', description: 'Pick a VIP ticket to reveal the dinner menu. Guest count is limited to 0–3.', tags: ['select', 'conditional', 'number'], schema: eventRegistration },
  { id: 'customer-feedback', title: 'Customer Feedback', description: 'A score below 7 asks a follow-up question, which must be at least 10 characters.', tags: ['conditional', 'validation'], schema: feedback },
  { id: 'bug-report', title: 'Bug Report', description: 'A severity picker, a URL checked by pattern, and a screenshot upload.', tags: ['pattern', 'file'], schema: bugReport },
  { id: 'newsletter', title: 'Newsletter Signup', description: 'The smallest useful schema: two fields.', tags: ['minimal'], schema: newsletter },
];
