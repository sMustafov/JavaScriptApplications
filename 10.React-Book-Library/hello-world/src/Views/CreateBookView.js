import React, { Component } from 'react';

export default class CreateBookView extends Component {
    render() {
        return (
            <form className="create-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Create Book</h1>
                <label>
                    <div>Name:</div>
                    <input type="text" name="name" required
                        ref={e => this.nameField = e} />
                </label>
                <label>
                    <div>Publisher:</div>
                    <input type="text" name="publisher" required
                       ref={e => this.publisherField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                        ref={e => this.descriptionField = e} />
                </label>
                <label>
                    <div>Price:</div>
                    <input type="number" name="price" required
                           ref={e => this.priceField = e} />
                </label>
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.nameField.value,
            this.publisherField.value,
            this.descriptionField.value,
            this.priceField.value
        );
    }
}
