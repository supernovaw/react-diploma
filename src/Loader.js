import "./Loaders.css";

const Loader = ({ type, loading, error, retry }) => {
  if (!loading && !error) return;

  function main() {
    if (error) return [
      <div key="a" className="error-message">Произошла ошибка</div>,
      !!retry && <button key="b" className="btn btn-outline-secondary" onClick={retry}>Повторить запрос</button>
    ]
    if (loading) return <span className={"loader" + type} />
  }

  return (
    <div className="loader-wrapper">
      {main()}
    </div>
  );
};

export default Loader;
