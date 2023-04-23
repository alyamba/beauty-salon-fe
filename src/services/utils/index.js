export const log = (variant = 'default', text = 'Hello world', data) => {
  var consoleStyles = {
    default: 'color: Orchid;',
    info: 'color: SkyBlue;',
    warn: 'color: Khaki;',
    error: 'color: red;',
    'api-success': 'color: PaleGreen;',
    'api-error': 'color: red;',
    cloud: 'color: LightSkyBlue;',
    complited: 'color: PaleGreen;',
    success: 'color: PaleGreen;',
  };
  const finishText = () => {
    switch (variant) {
      case 'error':
        return `🆘[ERROR] ${text}`;
      case 'warn':
        return `[WARN] ${text}`;
      case 'info':
        return `[INFO] ${text}`;
      case 'success':
        return `✅[SUCCESS] ${text}`;
      case 'api-success':
        return `[API SUCCESS] ${text}`;
      case 'api-error':
        return `🆘[API ERROR] ${text}`;
      case 'complited':
        return `✅[COMPLITED] ${text}`;
      default:
        return text;
    }
  };
  if (process.env.NODE_ENV === 'development') {
    return console.log(
      '%c%s',
      consoleStyles[variant],
      finishText(),
      data ? '=> ' : '',
      data || '',
    );
  }
};
