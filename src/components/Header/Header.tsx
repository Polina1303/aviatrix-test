import "./Header.css";

interface Prop {
  winning: number;
}

const Header = ({ winning }: Prop) => {
  return (
    <header className="header">
      <div className="header__content">
        <img
          className="header__logo"
          src={require("../../assets/images/euroCoin.png")}
          alt="euroCoin"
        />
        <p className="header__text">{winning.toFixed(2)}</p>
      </div>
    </header>
  );
};

export default Header;
