import React, { Component } from 'react';

export default class EditBookView extends Component {
    render() {
        return (
            <form className="edit-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Edit Book</h1>
                <label>
                    <div>Name:</div>
                    <input type="text" name="name" required
                           defaultValue={this.props.name}
                           ref={e => this.nameField = e} />
                </label>
                <label>
                    <div>Publisher:</div>
                    <input type="text" name="publisher" required
                           defaultValue={this.props.publisher}
                           ref={e => this.publisherField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                              defaultValue={this.props.description}
                              ref={e => this.descriptionField = e} />
                </label>
                <label>
                    <div>Price:</div>
                    <input type="text" name="price" required
                           defaultValue={this.props.price}
                           ref={e => this.priceField = e} />
                </label>
                <div>
                    <input type="submit" value="Edit" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.bookId,
            this.nameField.value,
            this.publisherField.value,
            this.descriptionField.value,
            this.priceField.value
        );
    }
}
