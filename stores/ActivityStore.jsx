// @flow

import Reflux from 'reflux'
import ActivityService from '../actions/ActivityService'

/**
 * [config description]
 * @type {[type]}
 */
class ActivityStore extends Reflux.Store {

  /**
   * [constructor description]
   * @return {[type]} [description]
   */
  constructor() {
    super()
    this.state = {
      lastError: null,
      activities: []
    }
    this.listenables = ActivityService
  }

  onGetByTypeCompleted(data:Array<Object>) {
    this.setState({ lastError: null, activities: data })
  }

  onGetByTypeFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onGetByDateRangeCompleted(data:Array<Object>) {
    this.setState({ lastError: null, activities: data })
  }

  onGetByDateRangeFailed(err:Object) {
    this.setState({ lstError: err })
  }

  onGetByIssuerCompleted(data:Array<Object>) {
    this.setState({ lastError: null, activities: data })
  }

  onGetByIssuerFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onFindCompleted(data:Array<Object>) {
    this.setState({ lastError: null, activities: data })
  }

  onFindFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onCreateCompleted(data:Object) {
    this.setState({ lastError: null, activities: [data, ...this.state.activities]})
  }

  onCreateFailed(err:Object) {
    this.setState({ lastError: err })
  }
}

export default ActivityStore
