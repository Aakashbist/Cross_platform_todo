/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var updateID;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.deviceReadyListener.bind(this), false);

        //listen to user event
        $("#save").click(this.handleSave);
        $("#update").click(this.handleUpdate);
        $(document).on('click', "#checkBox", function () {
            updateID = $(this).data("value")
            var todo = JSON.parse(localStorage.getItem(updateID))
            var _todo;
            if ($("input[type=checkbox]").is(
                ":checked")) {
                _todo = { item: todo.item, isComplete: true }
                localStorage.setItem(updateID, JSON.stringify(_todo))
            } else {
                _todo = { item: todo.item, isComplete: false }
                localStorage.setItem(updateID, JSON.stringify(_todo))
            }
        });
        $(document).on("click", "#edit_btn", this.edit)
        $(document).on("click", "#delete_btn", this.delete)

    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


    },

    deviceReadyListener: function () {
        navigator.geolocation.getCurrentPosition(this.onSuccess
            , this.onError, { timeout: 30000 })
        $("#update").hide()
        this.loadData();
    },
    onSuccess: function (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
    },
    onError: function (error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    },

    edit: function () {
        updateID = $(this).data("value")
        var todo = JSON.parse(localStorage.getItem(updateID))
        $("#todo_textBox").val(todo.item)
        $("#save").hide()
        $("#update").show()

    },

    delete: function () {
        var id = $(this).data("value")
        localStorage.removeItem(id)
        $(this).closest('tr').remove();

    },
    loadData: function () {
        var table = document.getElementById("myTable");

        for (var i = 0; i < localStorage.length; i++) {
            var todo = JSON.parse(localStorage.getItem(localStorage.key(i)))
            table.innerHTML +=
                `<td> <input class="form-check-input" type="checkbox"  data-value=${localStorage.key(i)}  id="checkBox"></td>
                    <td>${todo.item}</td>
        <td>
        <button id="edit_btn" data-value=${localStorage.key(i)} class="btn btn-info"  Onclick="edit(${localStorage.key(i)})">edit</button>
        <button id="delete_btn" data-value=${localStorage.key(i)} class="btn btn-danger" Onclick="delete(${localStorage.key(i)})">delete</button>
        </td> `;
        }
    },
    handleSave: function () {
        var item = $("#todo_textBox").val()
        if (item == "") {
            alert("cannot be empty")
            return
        }
        else {
            var date = new Date();
            var key = date.getMilliseconds();

            var todo = { item: item, isComplete: false }
            localStorage.setItem(key, JSON.stringify(todo))
            $("#todo_textBox").val("")
            location.reload()
        }
    },

    handleUpdate: function () {
        var item = $("#todo_textBox").val()
        if (item == "") {
            alert("cannot be empty")
            return
        }
        var todo = { item: item, isComplete: false }
        localStorage.setItem(updateID, JSON.stringify(todo))
        $("#todo_textBox").val("")
        $("#update").hide()
        $("#save").show()
        location.reload()
    }

};

app.initialize();


