// @flow

/**
 * Manages and maintains all routes internal to the
 * application. Allows extensions to register new routes on their behalf.
 *
 * @class RouteHandler
 */
class RouteHandler {

  config: Object
  extensionManager: Object
  routeMap: Map

  constructor (appConfig, extensionManager) {
    this.config = appConfig
    this.extensionManager = extensionManager
    this.routeMap = {  }
  }

  get routes () {
    return this.routeMap
  }
}

export default RouteHandler
