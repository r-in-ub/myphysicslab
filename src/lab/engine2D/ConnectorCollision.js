// Copyright 2016 Erik Neumann.  All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('myphysicslab.lab.engine2D.ConnectorCollision');

goog.require('goog.asserts');
goog.require('myphysicslab.lab.engine2D.Connector');
goog.require('myphysicslab.lab.engine2D.RigidBody');
goog.require('myphysicslab.lab.engine2D.RigidBodyCollision');
goog.require('myphysicslab.lab.util.Util');
goog.require('myphysicslab.lab.util.Vector');

goog.scope(function() {

var Connector = myphysicslab.lab.engine2D.Connector;
var RigidBody = myphysicslab.lab.engine2D.RigidBody;
var RigidBodyCollision = myphysicslab.lab.engine2D.RigidBodyCollision;
const Util = goog.module.get('myphysicslab.lab.util.Util');
const Vector = goog.module.get('myphysicslab.lab.util.Vector');

/** A RigidBodyCollision generated by a Connector.

* @param {!RigidBody} body the first body of the collision
* @param {!RigidBody} normalBody the second body of the collision, which often
    determines the normal vector
* @param {!Connector} theConnector the Connector that generated this collision
* @param {boolean} joint whether this is a bilateral constraint which can both
    push and pull.
* @constructor
* @final
* @struct
* @extends {RigidBodyCollision}
*/
myphysicslab.lab.engine2D.ConnectorCollision = function(body, normalBody, theConnector,
     joint) {
  RigidBodyCollision.call(this, body, normalBody, joint);
  /** Connector that generated this collision
  * @type {!Connector}
  * @private
  */
  this.theConnector_ = theConnector;
};
var ConnectorCollision = myphysicslab.lab.engine2D.ConnectorCollision;
goog.inherits(ConnectorCollision, RigidBodyCollision);

/** @override */
ConnectorCollision.prototype.toString = function() {
  return Util.ADVANCED ? '' :
      ConnectorCollision.superClass_.toString.call(this).slice(0, -1)
      +', theConnector_='+this.theConnector_+'}';
};

/** @override */
ConnectorCollision.prototype.getClassName = function() {
  return 'ConnectorCollision';
};

/** @override */
ConnectorCollision.prototype.checkConsistent = function() {
  ConnectorCollision.superClass_.checkConsistent.call(this);
  goog.asserts.assert( this.impact2 != null );
  if (this.normal_dt != null) {
    // Having derivative of normal implies the normal is curved.
    // unless the derivative is always zero.
    goog.asserts.assert( this.ballNormal);
  }
};

/** @override */
ConnectorCollision.prototype.getConnector = function() {
  return this.theConnector_;
};

/** @override */
ConnectorCollision.prototype.similarTo = function(c) {
  return false;
};

/** @override */
ConnectorCollision.prototype.updateCollision = function(time) {
  this.theConnector_.updateCollision(this);
  ConnectorCollision.superClass_.updateCollision.call(this, time);
};

}); // goog.scope
