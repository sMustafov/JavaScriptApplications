import React, { Component } from 'react';

export default class CommentBookView extends Component {
    render() {
        return (
            <form className="delete-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm Comment Product</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="name" disabled
                           defaultValue={this.props.name}
                           ref={e => this.nameField = e} />
                </label>
                <label>
                    <div>Publisher:</div>
                    <input type="text" name="publisher" disabled
                           defaultValue={this.props.publisher}
                           ref={e => this.publisherField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10" disabled
                              defaultValue={this.props.description}
                              ref={e => this.descriptionField = e}/>
                </label>
                <label>
                    <div>Price:</div>
                    <input type="number" name="price" disabled
                           defaultValue={this.props.price}
                           ref={e => this.priceField = e}/>
                </label>
                <div>
                    <textarea name="comment" rows="10"
                              ref={e => this.commentField = e}/>
                </div>
                <div>
                    <input type="submit" value="Comment" />
                </div>
                <div>
                    Comments

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
            this.priceField.value,
            this.commentField.value
        );
    }
}
