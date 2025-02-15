import LogoutButton from './LogoutButton';
const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 px-10 py-4">
      <h1 className="text-2xl font-bold font-serif">PICKSIX</h1>
      <LogoutButton />
    </div>
  );
};

export default Header;
