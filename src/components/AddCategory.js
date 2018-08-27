import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddCategory extends Component {
  static propTypes = {
    uid: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  }
  state = { category: '' }

  addCategory() {
    this.props.firestore.add(
      { collection: 'categories' },
      {
        uid: this.props.uid,
        name: this.state.category
      }
    )
    this.setState({ category: '' })
  }

  render() {
    if (!this.props.uid) return null

    return (
      <div>
        <input
          type="text"
          value={this.state.category}
          onChange={(evt) => this.setState({ category: evt.target.value })}
        />
        <button onClick={(evt) => this.addCategory()}>Add Category</button>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddCategory)
