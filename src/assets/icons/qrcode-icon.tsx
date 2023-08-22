import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  className?: string;
  color?: string;
}

const QrCodeIcon = (props: IconProps) => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <path
      d="M7.868 11.68L6.608 9.986C6.23467 10.0607 5.87067 10.098 5.516 10.098C4.592 10.098 3.74267 9.88333 2.968 9.454C2.20267 9.02467 1.59133 8.42733 1.134 7.662C0.686 6.88733 0.462 6.01933 0.462 5.058C0.462 4.09667 0.686 3.23333 1.134 2.468C1.59133 1.70267 2.20267 1.10533 2.968 0.676C3.74267 0.246667 4.592 0.0319998 5.516 0.0319998C6.44 0.0319998 7.28467 0.246667 8.05 0.676C8.82467 1.10533 9.43133 1.70267 9.87 2.468C10.318 3.23333 10.542 4.09667 10.542 5.058C10.542 5.898 10.3693 6.668 10.024 7.368C9.688 8.05867 9.21667 8.63267 8.61 9.09L10.766 11.68H7.868ZM2.912 5.058C2.912 5.926 3.14533 6.62133 3.612 7.144C4.088 7.65733 4.72267 7.914 5.516 7.914C6.3 7.914 6.92533 7.65267 7.392 7.13C7.868 6.60733 8.106 5.91667 8.106 5.058C8.106 4.19 7.868 3.49933 7.392 2.986C6.92533 2.46333 6.3 2.202 5.516 2.202C4.72267 2.202 4.088 2.45867 3.612 2.972C3.14533 3.48533 2.912 4.18067 2.912 5.058ZM16.9132 10L14.8692 6.29H14.2952V10H11.9012V0.172H15.9192C16.6939 0.172 17.3519 0.307333 17.8932 0.577999C18.4439 0.848666 18.8545 1.222 19.1252 1.698C19.3959 2.16467 19.5312 2.68733 19.5312 3.266C19.5312 3.91933 19.3445 4.50267 18.9712 5.016C18.6072 5.52933 18.0659 5.89333 17.3472 6.108L19.6152 10H16.9132ZM14.2952 4.596H15.7792C16.2179 4.596 16.5445 4.48867 16.7592 4.274C16.9832 4.05933 17.0952 3.756 17.0952 3.364C17.0952 2.99067 16.9832 2.69667 16.7592 2.482C16.5445 2.26733 16.2179 2.16 15.7792 2.16H14.2952V4.596Z"
      fill={props.color}
    />
  </svg>
);

QrCodeIcon.defaultProps = {
  color: theme.colors.main.purple,
  className: '',
};

export default QrCodeIcon;