interface IMainProps {
    children: React.ReactNode;
}

const Main = ({ children }: IMainProps) => {
    return <main className="main">{children}</main>;
};

export default Main;
