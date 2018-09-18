(function (root, undefined) {
define(['vn/radi'], function (ra) {

'use strict';
var fsm = {
    outputEnabled: true
};

var noTrans = function() { return false; };

fsm.create = function(id, states)
{
    var transition = {};

    //
    ra.forEach(
        states,
        function(fromState)
        {
            transition[fromState] = {};
            ra.forEach(
                states,
                function(toState) { transition[fromState][toState] = noTrans; }
                );
        }
        );

    //
    var clone  = function(id)
    {
        var currentState = (this.getCurrentState == undefined) ? states[0] : this.getCurrentState();

        //
        var gotoState =  function(newState)
        {
            var retVal = transition[currentState][newState]();
            

            if (retVal == false )
            {
//                ra.log("FALSE");
                fsm.outputEnabled && ra.warn("FSM '" + id + "': transition from '" + currentState + "' to '" + newState + "' not allowed.");
            }
            else
            {
//                ra.log("TRUE");
//                ra.log("op enabled == " + fsm.outputEnabled);
                fsm.outputEnabled && ra.info("FSM '" + id + "': transition from '" + currentState + "' to '" + newState + "'.");
                currentState = newState;
                if (typeof retVal === 'function')
                    retVal();
            }
        };

        //
        var getId = function() { return id; };
        var getCurrentState = function() { return currentState; };

        //
        return {
            states: states,
            transition: transition,
            gotoState: gotoState,
            clone: clone,
            getId: getId,
            getCurrentState: getCurrentState
        };
    };

    return clone.call(this, id);
};

//
// Public APIs
//

return fsm;

});})(this);
