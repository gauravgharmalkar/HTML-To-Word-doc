$(document).ready(function () {
    var actionBtnGroup = '<div class="btn-group" role="group"><button type="button" class="btn btn-outline-dark btn-sm" onclick="addNewRowButton(this)"><i class="fas fa-plus"></i></button><button type="button" class="btn btn-outline-dark btn-sm"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-outline-dark btn-sm"><i class="fas fa-trash"></i></button></div>';
    var headers = ["#", "Steps", "Snap", "Action"];
    createTable(headers, "happyFlowTableDiv", "happyFlowTableID");
    var headerWidths = ["", "80%", "15%", "15%"];
    adjustTableColumnSpace("happyFlowTableID", headerWidths);
    var tdValues = ['1',
        '<input class="form-control form-control-sm " type="text" placeholder="Enter Step Description here">',
        '<div class="input-group input-group-sm mb-3"><input type="text" name="img" class="form-control" placeholder="Paste image" aria-label="stepImage" aria-describedby="basic-addon2"><div class="input-group-append"><span class="input-group-text" id="basic-addon2"></span> </div></div>',
        actionBtnGroup];
    addRowToTable("happyFlowTableID", tdValues);

    $(".stepsTable").css("display", "none");

    $('#includeHappyFlowCheckbox').click(function () {
        if ($(this).is(':checked')) {
            $(".stepsTable").css("display", "block");
        } else {
            $(".stepsTable").css("display", "none");
        }
    });

});

/*  
    This function will create table with header names. need to pass header names and div class name when calling function
    Example : var headers = ["#", "Step", "Snap","Action"];
              createTable(headers, "div-className");
*/
function createTable(headerNames, divClassName, tableId) {
    var table = $("<table></table>").addClass("table").attr("id", tableId);;
    var thead = $("<thead></thead>").addClass("thead-light");
    var headers = [];

    headerNames.forEach(function (header) {
        headers.push($("<th></th>").text(header).attr("scope", "col"));
    });

    var headerRow = $("<tr></tr>");
    headers.forEach(function (th) {
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);
    table.append("<tbody></tbody>");

    $("." + divClassName).append(table);
}

/*
    This function will adjust space to the columns according to their use. Need to pass table id and header widths in sequence.
    Example : var headerWidths = ["", "80%", "15%", "15%"];
              adjustTableColumnSpace("happyFlowTableID", headerWidths);
*/
function adjustTableColumnSpace(tableId, headerWidths) {
    $("#" + tableId).find("th").each(function (index) {
        $(this).css("width", headerWidths[index]);
    });
}

/*
    This function will push row into mentioned table. Need to pass table id and row values to the function.
    Example : var tdValues = ['1','Gaurav','Gharmalkar','BMW'];
              addRowToTable("happyFlowTableID",tdValues);
*/

function addRowToTable(tableID, tdValues) {
    var table = $("#" + tableID);
    var lastRow = table.find('tbody tr:last');
    var lastRowId = lastRow.attr('id');
    var headerCount = table.find("thead th").length;

    if (lastRowId == undefined) {
        lastRowID = 0;
    }
    var newRowId = lastRowId !== undefined ? parseInt(lastRowId) + 1 : 1;

    var tr = $("<tr></tr>").attr("id", newRowId);

    if (tdValues.length === headerCount) {
        tdValues.forEach(function (value) {
            var td = $("<td></td>").html(value);
            tr.append(td);
        });
        table.find('tbody').append(tr);
    } else {
        console.log("Mismatch in number of table headers and td values.");
    }
}

/*
    This function invoke when + button clicked in row. You will need to pass this from onclick function.
    Example : <button type="button" class="btn btn-outline-dark btn-sm" onclick="addNewRowButton(this)"><i class="fas fa-plus"></i></button>
*/

function addNewRowButton(button) {
    const lastTableRow = button.closest('tr');
    var cells = lastTableRow.getElementsByTagName('td');
    var inputValue = "";
    var tdValuesArray = [];
    var flag = true;
    var table = button.closest('table');

    for (let i = 0; i < cells.length; i++) {
        tdValuesArray.push(cells[i].innerHTML.trim());
        let inputElement = cells[i].querySelector('input');
        let btnGroup = cells[i].querySelector('.btn-group');
        if (inputElement) {
            let nameValue = inputElement.name;
            if (nameValue != 'img') {
                inputValue = inputElement.value;
                if (inputValue != '') {
                    let paragraphElement = document.createElement('p');
                    paragraphElement.innerHTML = inputValue;
                    cells[i].replaceChild(paragraphElement, inputElement);
                } else {
                    flag = false;
                    inputElement.placeholder = 'This field is mandatory';
                }
            }
        }
        // remove add button from btn-group.
        if (flag != false) {
            if (btnGroup) {
                let addButton = btnGroup.querySelector('button[onclick="addNewRowButton(this)"]');
                if (addButton) {
                    btnGroup.removeChild(addButton);
                }
            }
        }
    }
    if (flag != false) {

        addRowToTable(table.id, tdValuesArray);
    }
}