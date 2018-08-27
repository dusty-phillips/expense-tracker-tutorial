import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import AddExpense from './AddExpense'


class ExpenseList extends Component {
  static propTypes = {
    uid: PropTypes.string,
    expenses: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      description: PropTypes.string,
      cost: PropTypes.string
    })),
    selectedCategory: PropTypes.string,
  }

  renderExpense({ key, description, cost }) {
    return (
      <div key={key}>
        <span style={{ display: "inline-block", width: '20rem' }}>{description}</span>
        <span>{cost}</span>
      </div>
    )
  }

  render() {
    const expenseItems = this.props.expenses.map(
      (e) => this.renderExpense(e)
    )
    return (
      <div>
        <div>
          {expenseItems}
        </div>
        <AddExpense />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    expenses: state.firestore.ordered.expenses
      ? state.firestore.ordered.expenses.map((t, idx) => {
        return { key: idx, description: t.description, cost: t.cost }
      })
      : [],
    selectedCategory: state.categories.selectedCategory
  }
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.uid) return []
    if (!props.selectedCategory) return []
    return [
      {
        collection: 'expenses',
        where: [
          ['uid', '==', props.uid],
          ['category', '==', props.selectedCategory]
        ],
        orderBy: ['cost', 'desc']
      }
    ]
  }
  )
)(ExpenseList)
