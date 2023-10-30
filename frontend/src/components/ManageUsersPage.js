import '../css/ManageUsersPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ManageUsersPage() {

    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem("user")

        if (user === null || user.accountId !== 1) {
            navigate('/')
        }
    })

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
        <div className="dropdown1">
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
