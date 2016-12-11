import React, { Component } from 'react';

export default class CommentsView extends Component {
    render() {
        let bookRows = this.props.books.map(book =>
            <tr key={book._id}>
                <td>{book.commentId}</td>
                <td>{book.comment}</td>
                <td>{this.state.username}</td>
            </tr>
        );

        return (
            <div className="books-view">
                <h1>Books</h1>
                <table className="books-table">
                    <thead>
                    <tr>
                        <th>Commented Book ID</th>
                        <th>Comment</th>
                        <th>User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookRows}
                    </tbody>
                </table>
            </div>
        );
    }
}
