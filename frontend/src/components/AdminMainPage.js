import '../css/AdminMainPage.css';
import { Link } from 'react-router-dom';
import filmImage from '../images/FilmReel.png';
function AdminMainPage() {
    return (
    <div id="AdminBody">
        <div id="AdminMainHeadtext">
            <h1 className="font-weight-bold">Welcome</h1>
            <h1 className="font-weight-bold">would you like to:</h1>
        </div>
        <div id="manageMovieBod">
            <div id="adminChoice">
                <Link to="/">
                    <div className="card" id="manageMovieContainer">
                        <img class="card-img-top mx-auto" src={filmImage} alt="filmReel" id='manageMovieImg'/>
                            <div class="card-body">
                                <h5 className="card-title">Manage Movies</h5>
                                <p className="card-text">Here you can edit movie times, ticket prices, movie trailers, movie posters and add new movies.  </p>
                            </div>
                    </div>    
                </Link>
                <Link to="/">
                    <div className="card" id="manageUsersContainer">
                        <img class="card-img-top mx-auto" src={filmImage} alt="filmReel" id='manageMovieImg'/>
                            <div class="card-body">
                                <h5 className="card-title">Manage Users</h5>
                                <p className="card-text">Here you can change the status of users by suspending users, promoting someone to admin or demoting an admin </p>
                            </div>
                    </div>    
                </Link>
                <Link to="/">
                    <div className="card" id="managePromotionsContainer">
                        <img class="card-img-top mx-auto" src={filmImage} alt="filmReel" id='manageMovieImg'/>
                            <div class="card-body">
                                <h5 className="card-title">Manage Promotions</h5>
                                <p className="card-text">Here you can create promotions and remove already existing promotions </p>
                            </div>
                    </div>    
                </Link>
            </div>
        </div>
    </div>
    );
}
export default AdminMainPage;