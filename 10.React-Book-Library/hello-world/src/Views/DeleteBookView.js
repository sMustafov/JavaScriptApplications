import React, { Component } from 'react';

export default class DeleteBookView extends Component {
    render() {
        return (
            <form className="delete-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm Delete Book</h1>
                <label>
                    <div>Name:</div>
                    <input type="text" name="name" disabled
                           defaultValue={this.props.name} />
                </label>
                <label>
                    <div>Publisher:</div>
                    <input type="text" name="publisher" disabled
                           defaultValue={this.props.publisher} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10" disabled
                              defaultValue={this.props.description} />
                </label>
                <label>
                    <div>Price:</div>
                    <input type="number" name="price" disabled
                           defaultValue={this.props.price} />
                </label>
                <div>
                    <input type="submit" value="Delete" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.bookId);
    }
}
