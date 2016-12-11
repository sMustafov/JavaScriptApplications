import React, { Component } from 'react';

export default class BooksView extends Component {
    render() {
        let bookRows = this.props.books.map(book =>
            <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.publisher}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                {this.getActions(book, this.props.userId)}
            </tr>
        );

        return (
            <div className="books-view">
                <h1>Books</h1>
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Publisher</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookRows}
                    </tbody>
                </table>
            </div>
        );
    }

    getActions(book, userId) {
        if (book._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit"
                        onClick={this.props.editBookClicked.bind(this, book._id)} />
                    &nbsp;
                    <input type="button" value="Delete"
                       onClick={this.props.deleteBookClicked.bind(this, book._id)} />
                    &nbsp;
                    <input type="button" value="Comment"
                           onClick={this.props.commentBookClicked.bind(this, book._id)} />
                </td>
            );
        else
            return <td></td>;
    }
}
