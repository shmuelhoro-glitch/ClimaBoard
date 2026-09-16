import { Link } from "react-router-dom";

const DashboardPage = () => {

    const userName = localStorage.getItem('userName')

  return (
    <div>
      <h1>שלום {userName}</h1>
        <Link to='/app/search/'>חיפוש עיר</Link>
    </div>
  );
};
export default DashboardPage;




