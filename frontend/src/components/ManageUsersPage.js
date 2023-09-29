import '../css/ManageUsersPage.css';

function ManageUsersPage() {
    return (
        <div className="manageusers">
        <div className="title">
        <div className="titlename">Manage Users</div>

        <div className="search">
        <input type="text" className="searchInput" placeholder="Search for user" />
        <button className="searchButton">Search</button>
        </div>

        </div>
        <div className="table">
        <table className="user">
        <thead>
        <tr>
        <th>Email</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {Array(5).fill(null).map((_, index) => (
        <tr key={index}>
        <td>user{index + 1}@example.com</td>
        <td>
        Active
        <div className="dropdown">
        <button className="dropdownButton">⋮</button>
        <div className="options">
        <a>Suspend</a>
        <a>Admin</a>
        <a>User</a>
        </div>
        </div>
        </td>
        </tr>
        ))}
        </tbody>
        </table>


        </div>
        </div>
    );
}

export default ManageUsersPage;
