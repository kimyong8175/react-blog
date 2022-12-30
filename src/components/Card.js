import PropTypes from "prop-types";

// children을 이용하고 싶다면 파라미터로 children을 보내면 됨.
const Card = ({ title, onClick, children }) => {
  //return <div className="card mb-3">{children}</div>;
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
      {/* edit 와 delete 같은 버튼을 children으로 넘겨줄수있음 */}
    </div>
  );
};

// component를 받아올 때 타입 체크
Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  children: null,
  onClick: () => {},
};

export default Card;
