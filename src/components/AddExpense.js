import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


class AddExpense extends Component {
  static propTypes = {
    uid: PropTypes.string,
    selectedCategory: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  }
  state = { description: '', cost: 0 }

  addExpense() {
    this.props.firestore.add(
      { collection: 'expenses' },
      {
        uid: this.props.uid,
        description: this.state.description,
        cost: this.state.cost,
        category: this.props.selectedCategory
      }
    )
    this.setState({ cost: 0, description: '' })
  }

  render() {
    if (!this.props.uid) return null
    if (!this.props.selectedCategory) return null

    return (
      <div>
        <input
          type="text"
          value={this.state.description}
          onChange={(evt) => this.setState({ description: evt.target.value })}
        />
        <input
          type="number"
          value={this.state.cost}
          step="0.01"
          onChange={(evt) => this.setState({ cost: evt.target.value })}
        />
        <button onClick={(evt) => this.addExpense()}>Add Expense</button>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    selectedCategory: state.categories.selectedCategory
  }
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(AddExpense)
