export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  snippets: CodeSnippet[];
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST',
  FOCUS = 'FOCUS'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isCode?: boolean;
}