interface IErrorPlaceholderProps {
    message: string;
}

const ErrorPlaceholder = ({ message }: IErrorPlaceholderProps) => <>{message}</>;

export default ErrorPlaceholder;
