import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import AddCategory from './AddCategory'

class CategoryList extends Component {
  static propTypes = {
    uid: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string)
  }

  renderCategory(category) {
    return <div key={category}>
      {category}
    </div>
  }

  render() {
    const categoryItems = this.props.categories.map(
      (name) => this.renderCategory(name)
    )
    return (
      <div>
        <div>
          {categoryItems}
        </div>
        <AddCategory />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    categories: state.firestore.ordered.categories ? state.firestore.ordered.categories.map(c => c.name) : [],
  }
}

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.uid) return []
    return [
      {
        collection: 'categories',
        where: [
          ['uid', '==', props.uid]
        ]
      }
    ]
  }
  )
)(CategoryList)
