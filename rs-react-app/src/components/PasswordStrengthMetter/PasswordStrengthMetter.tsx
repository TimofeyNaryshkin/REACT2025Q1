import { FC } from 'react';

interface PasswordStrengthMetterProps {
  strength: number;
}

const PasswordStrengthMetter: FC<PasswordStrengthMetterProps> = ({
  strength,
}) => {
  const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
  return (
    <p style={{ color: colors[strength] }}>
      {strength ? `Password srength: ${strength}` : ''}
    </p>
  );
};

export default PasswordStrengthMetter;
