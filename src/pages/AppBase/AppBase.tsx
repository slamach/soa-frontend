import Header from '../../components/Header/Header';

interface AppBaseProps {
  children: JSX.Element;
}

const AppBase = (props: AppBaseProps) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default AppBase;
