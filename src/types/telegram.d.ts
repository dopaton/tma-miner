export interface TelegramWebApp {
  ready: () => void;
  expand?: () => void;
  colorScheme?: string;
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  initDataUnsafe?: {
    user?: {
      id?: number;
      username?: string;
      first_name?: string;
    };
    start_param?: string;
  };
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  MainButton?: {
    setParams: (params: { text: string; is_visible: boolean; is_enabled: boolean }) => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback?: {
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
