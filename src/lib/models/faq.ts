export type question = {
  question: string;
  answer: string;
};

export type Faq = {
  title: string;
  subtitle: string;
  text: string;
  questions: question[];
};
