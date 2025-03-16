export default function getType(key: string) {
  switch (key) {
    case 'email': {
      return 'email';
    }
    case 'password': {
      return 'password';
    }
    case 'gender': {
      return 'radio';
    }
    case 'picture':
      return 'file';
    case 'acceptTermsConditions': {
      return 'checkbox';
    }
    default: {
      return 'text';
    }
  }
}
