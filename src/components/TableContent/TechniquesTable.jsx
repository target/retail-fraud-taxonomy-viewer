import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { RiExpandLeftRightFill, RiEdit2Fill } from 'react-icons/ri';
import {
  fetchTechnique,
  hasSubTechnique,
  filterDataMap,
  fetchAllTechniques,
  dataArray,
  handleHideToggle
} from '../../utils/dataMap';
import './Table.css';
import './subtechnique.css';
import './more_details.css';

const EXPAND = 'expand';
const COLLAPSE = 'collapse';
const DYNAMIC_COLUMN_PREFIX = 'New Column';
const SHOW_ALL = 'Show All';
const FOCUS = '#444';
const NO_FOCUS = 'transparent';

const TechniquesTable = ({
  onValueClick,
  searchFilter,
  searchFilterType,
  isPanelOpen,
  onEditClick,
  editStatus,
  importContent,
  viewCustomMode,
  selectedTechnique,
  hideStatus,
  hideToggleStatus,
  selectedColor,
  riskScoreInfo
}) => {
  const [tableData, setTableData] = useState(() => {
    const savedData = localStorage.getItem('technique_table');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [addedColumns, setAddedColumns] = useState([]);
  const [filteredDataMap, setFilteredDataMap] = useState([]);
  const [allTechniques, setAllTechniques] = useState([]);
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });
  const tableRef = useRef(null);
  const [focusedLiIndex, setFocusedLiIndex] = useState(null);
  const focusedLiIndexRef = useRef(null);
  const hasFocused = useRef(false);
  const [columnsProcessed, setColumnsProcessed] = useState(new Set());
  const columnsProcessedRef = useRef(new Set(columnsProcessed));
  const [hiddenTechniques, setHideTechniques] = useState([]);
  const [cellColors, setCellColors] = useState({});

  const handleEdit = (technique) => {
    onEditClick(technique);
  };

  // Focus the first cell after mount
  useLayoutEffect(() => {
    const checkAndFocus = () => {
      if (hasFocused.current) return;
      const table = tableRef.current;
      if (table) {
        const cells = table.querySelectorAll('td');
        if (cells.length > 0) {
          cells[0].focus();
          hasFocused.current = true;
        }
      }
    };
    setTimeout(checkAndFocus, 100);
    return () => {
      hasFocused.current = false;
    };
  }, []);

  useEffect(() => {
    if (viewCustomMode) {
      const local = localStorage.getItem("technique_table");
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            setTableData(parsed);
          }
        } catch (e) {
          console.error("Error parsing localStorage on mount", e);
        }
      }
    } else {
      const fetchTechniques = async () => {
        const fetchedTechniques = await fetchAllTechniques();
        setAllTechniques(fetchedTechniques);
        setTableData(fetchedTechniques);
      };
      fetchTechniques();
    }
  }, []);

  // Handle importContent updates
  useEffect(() => {
    if (importContent?.technique_table) {
      localStorage.setItem('technique_table', JSON.stringify(importContent.technique_table));
      localStorage.setItem('techniques', JSON.stringify(importContent.techniques));
      setTableData(importContent.technique_table);
    }
  }, [importContent]);

  // Handle viewCustomMode toggles
  useEffect(() => {
    if (viewCustomMode) {
      const local = localStorage.getItem("technique_table");
      try {
        const parsed = local ? JSON.parse(local) : [];
        if (Array.isArray(parsed)) {
          setTableData(parsed);
        }
      } catch (e) {
        console.error("Error loading custom content from localStorage", e);
      }
    } else {
      setTableData(allTechniques);
    }
  }, [viewCustomMode]);

  useEffect(() => {
    if (!viewCustomMode) {
      setTableData(allTechniques);
    }
  }, [allTechniques]);

  useEffect(() => {
    const fetchTechniques = async () => {
      if (!localStorage.getItem('technique_table')) {
        const fetchedTechniques = await fetchAllTechniques();
        localStorage.setItem('technique_table', JSON.stringify(fetchedTechniques));
        localStorage.setItem('techniques', JSON.stringify(dataArray));
      }

      if (selectedTechnique) {
        const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

        const updatedTechniques = storedTechniques.map(item => {
          if (item.name === selectedTechnique) {
            return { ...item, hide: hideStatus };
          }
          return item;
        });

        localStorage.setItem('techniques', JSON.stringify(updatedTechniques));

        setHideTechniques(prev => {
          const alreadyExists = prev?.includes(selectedTechnique);

          if (hideStatus && !alreadyExists) {
            return [...prev, selectedTechnique];
          } else if (!hideStatus && alreadyExists) {
            return prev.filter(item => item !== selectedTechnique);
          }

          return prev;
        });

      }
    };

    fetchTechniques();

  }, [hideStatus]);

  useEffect(() => {
    setAddedColumns([]);
    if (searchFilter !== '' && searchFilterType !== SHOW_ALL) {
      setFilteredDataMap(filterDataMap(searchFilter, searchFilterType));
    } else {
      setTableData(fetchAllTechniques());
    }
    // eslint-disable-next-line
  }, [searchFilter]);

  useEffect(() => {
    setAddedColumns([]);
    if (!hideToggleStatus) {
      const matchedTechniques = handleHideToggle(hideToggleStatus);
      const result = consolidateData(matchedTechniques);
      setTableData(result)
    } else {
      const localStorageTechniques = JSON.parse(localStorage?.getItem('techniques'));
      // Find hidden techniques
      const hiddenTechniquesNames = localStorageTechniques
        ?.filter(t => t.hide === true)
        .map(t => t.name);

      setHideTechniques(hiddenTechniquesNames)

      setTableData(allTechniques);
    }
    // eslint-disable-next-line
  }, [hideToggleStatus]);

  useEffect(() => {
    // Update the ref with the latest state combining rowIndex and columnsProcessed
    columnsProcessed.forEach(cellIdentifier => {
      columnsProcessedRef.current.add(cellIdentifier); // Add the combination of rowIndex and colIndex to the ref
    });
  }, [columnsProcessed]);

  let headers = ''
  if (tableData && tableData.length > 0)
    headers = Object.keys(tableData[0]);

  // Function to get the column header based on dynamic colIndex
  const getColumnHeaderByIndex = (colIndex) => {
    return headers[colIndex];
  };

  // Function to process the table data and avoid reprocessing columns
  useEffect(() => {
    const processColumns = async () => {
      for (let rowIndex = 0; rowIndex < tableData?.length; rowIndex++) {
        const item = tableData[rowIndex];

        for (let colIndex = 0; colIndex < Object.keys(item).length; colIndex++) {
          const key = Object.keys(item)[colIndex];
          let headerName = getColumnHeaderByIndex(colIndex);  // Get the header name based on colIndex
          const isProcessed = columnsProcessedRef.current.has(`${rowIndex}-${headerName}`);

          const hasSubTech = item[key] && item[key].length > 0 && hasSubTechnique(item[key]);

          if (!isProcessed && hasSubTech && searchFilter !== '' && searchFilterType !== SHOW_ALL) {

            if (item[key])
              manage_columns(item[key].toLowerCase(), rowIndex, colIndex);

            // Mark this column as processed
            headerName = getColumnHeaderByIndex(colIndex);
            setColumnsProcessed(prev => new Set(prev).add(`${rowIndex}-${headerName}`)); // Add to processed set
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between columns
          }
        }
      }
    }
    // Trigger the process when tableData or addedColumns change
    processColumns();

    handleCellColoring()
  }, [tableData, columnsProcessed]);

  const consolidateData = (data) => {
    // Create an object to store the non-empty values for each column
    const nonEmptyValues = {};

    // Step 1: Collect all non-empty values for each column
    data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (row[key] !== '') {
          if (!nonEmptyValues[key]) {
            nonEmptyValues[key] = [];
          }
          nonEmptyValues[key].push(row[key]);
        }
      });
    });

    // Step 2: For each row, fill in the non-empty values for each column
    return data.map((row, rowIndex) => {
      const newRow = {};

      Object.keys(row).forEach((key) => {
        // If there are non-empty values for this column, set them in sequence
        if (nonEmptyValues[key] && nonEmptyValues[key].length > 0) {
          // Pop the first non-empty value and assign it to the row

          newRow[key] = nonEmptyValues[key].shift();
        } else {
          // If there are no non-empty values left, set the column to an empty string
          newRow[key] = '';
        }
      });

      return newRow;
    });
  };

  useEffect(() => {
    setColumnsProcessed(new Set());
    columnsProcessedRef.current = new Set();

    let filteredKeys = '';

    if (filteredDataMap && Object.keys(filteredDataMap).length > 0) {
      filteredKeys = Object.keys(filteredDataMap).map((key) => {
        return key
          .split('_')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          .join(' ');
      });
    }

    let filteredTechniques = allTechniques.map((technique) => {
      const updatedTechnique = { ...technique };
      Object.keys(updatedTechnique).forEach((key) => {
        if (!filteredKeys.includes(updatedTechnique[key])) {
          updatedTechnique[key] = '';
        }
      });
      return updatedTechnique;
    });

    const isValueEmpty = value =>
      value === "" || value === null || value === undefined;
    
    const allKeysEmptyInAllObjects = (jsonArray) => {
      return jsonArray.every(obj =>
        Object.values(obj).every(isValueEmpty)
      );
    };

    let tableIsEmpty = allKeysEmptyInAllObjects(filteredTechniques)

    if((searchFilterType === 'risk_score' || tableIsEmpty) && filteredKeys && filteredKeys.length > 0){
      const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

      // Get keys from the first object once to create fresh empty entries dynamically
      const baseKeys = Object.keys(filteredTechniques[0]);
      const createEmptyEntry = () =>
        baseKeys.reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {});

      const updatedTechniques = [...filteredTechniques];

      filteredKeys.forEach(name => {
        const technique = storedTechniques.find(t => t.name.toLowerCase() === name.toLowerCase());
        if (!technique) return;

        let tactics;
        try {
          // If tactics is a JSON string, parse it. Otherwise, assume it's an array.
          tactics = typeof technique.tactics === 'string' ? JSON.parse(technique.tactics) : technique.tactics;
        } catch (err) {
          return;
        }

        tactics.forEach(tactic => {
          const tacticKey = tactic.toLowerCase().replace(/\s+/g, '_'); // normalize key

          // Check if tacticKey exists
          if (!(tacticKey in updatedTechniques[0])) {
            return;
          }

          // Check if this technique.name already exists in any entry's tacticKey to avoid duplicates
          const isDuplicate = updatedTechniques.some(entry => entry[tacticKey] === technique.name);
          if (isDuplicate) {
            return;
          }

          // Assign to first available object with empty slot
          let assigned = false;
          for (let i = 0; i < updatedTechniques.length; i++) {
            if (!updatedTechniques[i][tacticKey]) {
              updatedTechniques[i][tacticKey] = technique.name;
              assigned = true;
              break;
            }
          }
          // If none available, create new entry
          if (!assigned) {
            const newEntry = createEmptyEntry();
            newEntry[tacticKey] = technique.name;
            updatedTechniques.push(newEntry);
          }
        });
      });
}
    
    if (filteredTechniques.length > 0) {
      const result = consolidateData(filteredTechniques);
      if (result !== null && result.length > 0) {
        let index = Object.keys(result[0]).findIndex(key => result[0][key] !== '');
        setFocusedCell({ row: 0, col: index })
      }
      setTableData(result);
    } else {
      if (filteredDataMap !== null && filteredDataMap?.length > 0) {
        let index = Object.keys(filteredDataMap[0]).findIndex(key => filteredDataMap[0][key] !== '');
        setFocusedCell({ row: 0, col: index })
      }
      setTableData(filteredDataMap);
    }
    // eslint-disable-next-line
  }, [filteredDataMap]);

  const filterBySubTechniques = (sub_techniques) => {
    let filteredKeys = []

    if (filteredDataMap && Object.keys(filteredDataMap).length > 0) {
      filteredKeys = Object.keys(filteredDataMap).map((key) => {
        return key
          .split('_')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          .join(' ');
      });
    }

    const result = sub_techniques?.filter(element => filteredKeys.includes(element));
    return result
  };

  const handle_sub_techniques = (sub_techniques, rowIndex, colIndex) => {
    const stringWithBreaks = (
      <ul>
        {sub_techniques &&
          sub_techniques.map((line, index) => (
            <li
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              tabIndex={0}
              key={index}
              onFocus={() => {
                let row = rowIndex;
                let col = colIndex;
                const currentCell = tableRef.current?.querySelector(
                  `tr:nth-child(${row + 1}) td:nth-child(${col + 2})`,
                );

                if (!currentCell) return;

                const subCells = currentCell.querySelectorAll('li');
                const isSubcell = subCells.length > 0;

                if (isSubcell) {
                  for (let i = 0; i < subCells.length; i++) {
                    if (i === index) {
                      subCells[i]?.focus();
                      subCells[i].style.backgroundColor = FOCUS;
                    } else {
                      subCells[i].style.backgroundColor = NO_FOCUS;
                    }
                  }
                }
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevents the event from bubbling up to the <td>
                // onValueClick(line); // Trigger the onValueClick function
                handleSubCellClick(rowIndex, colIndex, line, index);
              }}
            >
              {/* {line} */}
              <span style={{ flex: 1, textAlign: 'center' }}>{line}</span>
              {editStatus && (
                <>
                  <div
                    // className="sub-technique-editicon"
                    style={{
                      paddingRight: '10px',
                      cursor: 'pointer',
                      backgroundColor: 'rgb(48, 48, 48)',
                      color: 'white'
                    }}
                    aria-label="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      // e.preventDefault();
                      handleEdit(line);
                    }}
                  >
                    <RiEdit2Fill className="white-icon" />
                  </div>
                </>
              )}

              {/* <RiEdit2Fill/> */}
            </li>
          ))}
      </ul>
    );

    return stringWithBreaks;
  };

  const rename_headers = (updatedData, operation, other_columns) => {
    let headers = [];

    // Determine which headers to use based on the operation (EXPAND or not)
    if (operation === EXPAND) {
      headers = Object.keys(updatedData[0]);
    } else {
      headers = Object.keys(tableData[0]);
    }

    // Iterate through the headers
    headers.forEach((key, index) => {
      if (key.includes(DYNAMIC_COLUMN_PREFIX)) {
        const key_split = key.split(' ');
        const columeNameSplit = key_split[key_split.length - 1];
        const rowNumber = parseInt(columeNameSplit.split('-')[0]);
        const columnNumber = parseInt(columeNameSplit.split('-')[1]);

        // If the column is part of 'other_columns', rename it
        if (other_columns.includes(columnNumber)) {
          const old_header = key;
          let new_header = '';

          // Handle COLLAPSE or other operations to determine the new header name
          if (operation === COLLAPSE) {
            new_header = `${DYNAMIC_COLUMN_PREFIX} ${rowNumber}-${columnNumber - 1}`;
          } else {
            new_header = `${DYNAMIC_COLUMN_PREFIX} ${rowNumber}-${columnNumber + 1}`;
          }

          // Update headers array to reflect the new header name
          headers = headers.map((header) =>
            header === old_header ? new_header : header,
          );

          // Now, go through updatedData and rename the column for each row
          updatedData = updatedData.map((row) => {
            const updatedRow = { ...row };

            // If the old header exists in the row, rename it
            if (updatedRow.hasOwnProperty(old_header)) {
              updatedRow[new_header] = updatedRow[old_header]; // Copy the value to the new header
              delete updatedRow[old_header]; // Remove the old header key
            }

            // Reorder the row based on the updated headers
            const reorderedRow = {};
            headers.forEach((header) => {
              // Retain the values for each header, including the renamed ones
              if (updatedRow.hasOwnProperty(header)) {
                reorderedRow[header] = updatedRow[header];
              }
            });

            return reorderedRow;
          });
        }
      }
    });

    return updatedData;
  };

  const handle_dynamic_column = (
    update_columns,
    updatedData,
    operation,
    newColumnIndex,
  ) => {
    let other_columns = [];
    update_columns.forEach((columnName) => {
      const key_split = columnName.split(' ');
      const columeNameSplit = key_split[key_split.length - 1];
      const columnNumber = parseInt(columeNameSplit.split('-')[1]);

      if (operation === COLLAPSE) {
        // Check if all values for the current column are empty ('' or null or undefined)
        const allEmpty = updatedData.every((item) => !item[columnName]);

        // If all values are empty, delete the column from all objects
        if (allEmpty) {
          updatedData.forEach((item) => {
            delete item[columnName]; // Delete the column from each object
          });

          setTableData(updatedData);

          const result = addedColumns.filter((index) => index !== columnNumber);
          setAddedColumns(result);

          let other_columns = result.filter((item) => item > columnNumber);

          if (other_columns && other_columns.length > 0) {
            // Update the added columns state by decrementing the column by 1 that are greater than the collapsed column index
            updatedData = rename_headers(updatedData, COLLAPSE, other_columns);

            setAddedColumns((prevAddedColumns) => {
              return prevAddedColumns.map((columnIndex) =>
                columnIndex > columnNumber ? columnIndex - 1 : columnIndex,
              );
            });
          }
        }

        if (focusedCell.col + 1 > columnNumber) {
          setFocusedCell((prev) => {
            const newCol = prev ? prev.col - 1 : 0;
            return { row: prev.row, col: newCol };
          });
        }
        setTableData(updatedData);
      } else {
        // operation == add
        other_columns = addedColumns.filter((item) => item >= columnNumber);
        if (other_columns && other_columns.length > 0) {
          updatedData = rename_headers(updatedData, EXPAND, other_columns);

          setAddedColumns((prevAddedColumns) => {
            return prevAddedColumns.map((columnIndex) =>
              columnIndex > columnNumber ? columnIndex + 1 : columnIndex,
            );
          });
          // setTableData(updatedData);
        } else {
          setAddedColumns([...addedColumns, newColumnIndex]);
        }

        if (focusedCell.col + 1 > columnNumber) {
          setFocusedCell((prev) => {
            const newCol = prev ? prev.col + 1 : 0;
            return { row: prev.row, col: newCol };
          });
        }
      }
    });

    if (operation === EXPAND) {
      setTableData(updatedData);
      if (other_columns && other_columns.length > 0) {
        setAddedColumns((prevState) => {
          const updatedColumns = [...prevState, newColumnIndex];
          return updatedColumns;
        });
      }
    }
  };

  // Function to add/remove columns dynamically with toggling behavior
  const manage_columns = (technique, rowIndex, colIndex) => {

    if (technique) {
      const newColumnIndex = colIndex + 1;
      let data_present_in_column = false;
      let delete_columns = [];
      let added_columns = [];
      let operation = '';

      if (addedColumns.includes(newColumnIndex)) {
        operation = COLLAPSE;
      } else {
        operation = EXPAND;
      }

      let updatedData = tableData.map((row, tableRowIndex) => {
        const rowKeys = Object.keys(row);
        const updatedRow = {};
        let insertedNewColumn = false;

        rowKeys.forEach((key, keyIndex) => {
          updatedRow[key] = row[key]; // Copy existing row data

          if (operation === COLLAPSE) {
            if (key.includes(DYNAMIC_COLUMN_PREFIX)) {
              const key_split = key.split(' ');
              const existingColumnName = key_split[key_split.length - 1];

              // Already dynamic column is in expanded state
              if (existingColumnName.endsWith(newColumnIndex.toString())) {
                const new_column_name = `${DYNAMIC_COLUMN_PREFIX} ${existingColumnName}`;

                if (tableRowIndex === rowIndex) {
                  if (
                    updatedRow[new_column_name] !== undefined &&
                    updatedRow[new_column_name]
                  ) {
                    updatedRow[new_column_name] = '';
                    data_present_in_column = false;
                  } else {
                    const techniqueName = fetchTechnique(technique);
                    let sub_tech = []
                    if (searchFilterType === '' || searchFilterType === SHOW_ALL) {
                      sub_tech = techniqueName['sub_techniques']
                    } else {
                      sub_tech = filterBySubTechniques(techniqueName['sub_techniques'])
                    }

                    if (sub_tech && sub_tech.length > 0) {
                      updatedRow[new_column_name] = handle_sub_techniques(
                        sub_tech,
                        rowIndex,
                        colIndex
                      );
                      data_present_in_column = true;
                    }

                  }
                }
                if (tableRowIndex === tableData.length - 1) {
                  // Delete the entire column if it does not have any value in any of the rows
                  if (!data_present_in_column) {
                    delete_columns.push(new_column_name);
                  }
                }
              }
            }
          } else {
            // operation == add
            if (key.includes(DYNAMIC_COLUMN_PREFIX)) {
              const key_split = key.split(' ');
              const existingColumnName = key_split[key_split.length - 1];

              if (existingColumnName.endsWith(newColumnIndex.toString())) {
                const rowNumber = parseInt(
                  existingColumnName.toString().substring(0, 1),
                );

                const new_column_name = `${DYNAMIC_COLUMN_PREFIX} ${rowIndex}-${newColumnIndex}`;

                if (keyIndex === rowNumber) {
                  updatedRow[new_column_name] = updatedRow[existingColumnName];
                  delete updatedRow[existingColumnName];
                }
                if (tableRowIndex === rowIndex) {
                  const techniqueName = fetchTechnique(technique);
                  let sub_tech = []
                  if (searchFilterType === '' || searchFilterType === SHOW_ALL) {
                    sub_tech = techniqueName['sub_techniques']
                  } else {
                    sub_tech = filterBySubTechniques(techniqueName['sub_techniques'])
                  }

                  if (sub_tech && sub_tech.length > 0) {
                    updatedRow[new_column_name] = handle_sub_techniques(
                      sub_tech,
                      rowIndex,
                      colIndex
                    );
                    added_columns.push(new_column_name);
                  }
                }
              }
            } else {
              if (keyIndex === colIndex && !insertedNewColumn) {
                const columnName = `${DYNAMIC_COLUMN_PREFIX} ${rowIndex}-${newColumnIndex}`;
                const key_split = columnName.split(' ');
                const rowColumnNumber = key_split[key_split.length - 1];
                updatedRow[columnName] = '';

                if (
                  keyIndex === colIndex &&
                  rowIndex === tableRowIndex &&
                  !insertedNewColumn
                ) {
                  const techniqueName = fetchTechnique(technique);
                  let sub_tech = []
                  if (searchFilterType === '' || searchFilterType === SHOW_ALL) {
                    sub_tech = techniqueName['sub_techniques']
                  } else {
                    sub_tech = filterBySubTechniques(techniqueName['sub_techniques'])
                  }

                  if (sub_tech && sub_tech.length > 0) {
                    updatedRow[columnName] = handle_sub_techniques(
                      sub_tech,
                      rowIndex,
                      colIndex
                    );
                    insertedNewColumn = true;
                    added_columns.push(
                      `${DYNAMIC_COLUMN_PREFIX} ${rowColumnNumber}`,
                    );
                  } else {
                    delete_columns.push(columnName);
                  }
                }
              }
            }
            setTableData(updatedRow);
          }
        });
        return updatedRow;
      });

      if (operation === COLLAPSE) {
        if (delete_columns.length > 0) {
          handle_dynamic_column(
            delete_columns,
            updatedData,
            operation,
            newColumnIndex,
          );
        } else {
          setTableData(updatedData);
        }
      } else {
        if (added_columns.length > 0) {
          handle_dynamic_column(
            added_columns,
            updatedData,
            operation,
            newColumnIndex,
          );
        } else {
          handle_dynamic_column(
            delete_columns,
            updatedData,
            COLLAPSE,
            newColumnIndex,
          );
        }
      }
    }
  };

  const form_header = (header) => {
    const result = header
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(' ');
    return result;
  };

  const renderHeaders = () => {
    if (tableData?.length === 0) return null;

    if (tableData && tableData.length > 0 && tableData[0] != null) {
      const headers = Object.keys(tableData[0]);

      return headers.map((header, idx) => (
        <th
          key={idx}
          className={
            header.includes(DYNAMIC_COLUMN_PREFIX) ? 'emptycell' : 'tableheader'
          }
        >
          {form_header(header)}
        </th>
      ));
    }
  };

  const handleSubCellClick = async (rowIndex, colIndex, line, index) => {
    if (line !== '') {
      // Reset previously focused subcell's background color (if any)
      if (focusedCell) {
        const previousCell = tableRef.current?.querySelector(
          `tr:nth-child(${focusedCell.row + 1}) td:nth-child(${focusedCell.col + 1})`,
        );
        if (previousCell) {
          // If the previous cell had subcells, reset their background color
          const subCells = previousCell.querySelectorAll('li');
          if (subCells.length > 0) {
            subCells.forEach((subCell) => {
              subCell.style.backgroundColor = NO_FOCUS;
            });
          }
        }
      }

      // Set the new focused cell
      setFocusedCell({ row: rowIndex, col: colIndex + 1 });
      setFocusedLiIndex(index);

      // Focus the clicked <td> and its subcell (if any)
      const currentCell = tableRef.current?.querySelector(
        `tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`,
      );
      if (currentCell) {
        currentCell.focus(); // Focus the <td>

        // If the cell contains subcells (<li>), focus the first <li>
        const subCells = currentCell.querySelectorAll('li');
        if (subCells.length > 0) {
          subCells[index]?.focus(); // Focus the first <li> element
          // Set the background color of the newly focused subcell
          for (let i = 0; i < subCells.length; i++) {

            if (i == index) {
              subCells[i].style.backgroundColor = FOCUS;
            } else {
              subCells[i].style.backgroundColor = NO_FOCUS;
            }
          }
        }
      }
      onValueClick(line);
    }
  };

  const handleCellClick = async (rowIndex, colIndex, item, key) => {
    //  await resetFocus();
    if (item[key] !== '') {
      // Reset previously focused subcell's background color (if any)
      if (focusedCell) {
        const previousCell = tableRef.current?.querySelector(
          `tbody tr:nth-child(${focusedCell.row + 1}) td:nth-child(${focusedCell.col})`,
        );
        if (previousCell) {
          // If the previous cell had subcells, reset their background color
          const subCells = previousCell.querySelectorAll('li');
          if (subCells.length > 0) {
            subCells.forEach((subCell) => {
              subCell.style.backgroundColor = NO_FOCUS;
            });
          }
        }
      }

      // Set the new focused cell
      setFocusedCell({ row: rowIndex, col: colIndex });
      setFocusedLiIndex(null); // Reset any previous subcell focus

      // Focus the clicked <td> and its subcell (if any)
      const currentCell = tableRef.current?.querySelector(
        `tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`,
      );
      if (currentCell) {
        currentCell.focus(); // Focus the <td>

        // If the cell contains subcells (<li>), focus the first <li>
        const subCells = currentCell.querySelectorAll('li');
        if (subCells.length > 0) {
          subCells[0]?.focus(); // Focus the first <li> element
          // Set the background color of the newly focused subcell
          subCells[0].style.backgroundColor = FOCUS;
        }
      }
      onValueClick(item[key]);
    }
  };

  // Track the focusedLiIndexRef after the state is updated
  useEffect(() => {
    if (focusedLiIndex !== null) {
      focusedLiIndexRef.current = focusedLiIndex;
    }
  }, [focusedLiIndex]);

  useEffect(() => {
    if (!selectedTechnique) return;

    if(selectedColor === 'rgba(0, 0, 0, 1)') {
      setCellColors(prev =>
        Object.fromEntries(
          Object.keys(prev).map(key => [key, 'rgba(0, 0, 0, 1)'])
        )
      );
    } else {
      setCellColors(prev => ({
        ...prev,
        [selectedTechnique]: selectedColor
      }));
    }
  }, [selectedColor]);

  useEffect(() => {
    if (!selectedTechnique) return;
    //Update the risk score value of the technique
    if (selectedTechnique && riskScoreInfo !== null) {
      const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];

      const updatedTechniques = storedTechniques.map(item => {
        if (item.name === selectedTechnique) {
          return { ...item, risk_score: parseInt(riskScoreInfo) };
        }
        return item;
      });

      localStorage.setItem('techniques', JSON.stringify(updatedTechniques));
    }

  }, [riskScoreInfo]);

  function extractText(node) {
    if (typeof node === 'string' || typeof node === 'number') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('');
    }
    if (node?.props?.children) {
      return extractText(node.props.children);
    }
    return '';
  }

  function extractLiValues(reactUlElement) {
    const children = reactUlElement?.props?.children;
    if (!children) return [];

    const liElements = Array.isArray(children) ? children : [children];

    return liElements
      .filter(child => child?.type === 'li')
      .map(li => extractText(li.props.children));
  }



  const renderRows = () => {
    if (tableData && tableData.length === 0) {
      const savedData = localStorage.getItem('technique_table');
      if (savedData) setTableData(JSON.parse(savedData));
    }

    return (
      tableData &&
      tableData.map((item, rowIndex) => (
        <tr key={rowIndex}>
          {Object.keys(item).map((key, colIndex) => {
            const cellValue = item[key];

            let isSubcell = false
            let sub_techniques = []

            if (cellValue !== null && typeof cellValue === 'object' && !Array.isArray(cellValue)) { //Sub Techniques
              isSubcell = true
              sub_techniques = extractLiValues(cellValue)
            }

            return (
              <td
                key={rowIndex + '-' + colIndex}
                className={cellValue === '' ? 'emptycell' : 'tabledata'}
                tabIndex={0}
                style={{
                  backgroundColor:
                    cellColors[cellValue] ??
                    (focusedCell.row === rowIndex &&
                      focusedCell.col === colIndex &&
                      focusedLiIndex == null
                      ? FOCUS
                      : NO_FOCUS),
                  outline: 'none',
                  color: hiddenTechniques?.includes(cellValue) ? 'grey' : 'white',
                }}
                onClick={() => {
                  if (cellValue !== '') {
                    handleCellClick(rowIndex, colIndex, item, key);
                  }
                }}
              >
                {/* Subcell rendering */}
                {isSubcell ? (
                  <ul>
                    {sub_techniques &&
                      sub_techniques.map((line, index) => (
                        <li
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          tabIndex={0}
                          key={index}
                          onFocus={() => {
                            let row = rowIndex;
                            let col = colIndex;
                            const currentCell = tableRef.current?.querySelector(
                              `tr:nth-child(${row + 1}) td:nth-child(${col + 2})`,
                            );

                            if (!currentCell) return;

                            const subCells = currentCell.querySelectorAll('li');
                            const isSubcell = subCells.length > 0;

                            if (isSubcell) {
                              for (let i = 0; i < subCells.length; i++) {
                                if (i === index) {
                                  subCells[i]?.focus();
                                  subCells[i].style.backgroundColor = FOCUS;
                                } else {
                                  subCells[i].style.backgroundColor = NO_FOCUS;
                                }
                              }
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the event from bubbling up to the <td>
                            // onValueClick(line); // Trigger the onValueClick function
                            handleSubCellClick(rowIndex, colIndex, line, index);
                          }}
                        >
                          {/* {line} */}
                          <span style={{ flex: 1, textAlign: 'center' }}>{line}</span>
                          {editStatus && (
                            <>
                              <div
                                // className="sub-technique-editicon"
                                style={{
                                  paddingRight: '10px',
                                  cursor: 'pointer',
                                  backgroundColor: 'rgb(48, 48, 48)',
                                  color: 'white'
                                }}
                                aria-label="edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // e.preventDefault();
                                  handleEdit(line);
                                }}
                              >
                                <RiEdit2Fill className="white-icon" />
                              </div>
                            </>
                          )}

                          {/* <RiEdit2Fill/> */}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <>
                    {editStatus && cellValue && (
                      <div
                        className="editicon"
                        aria-label="edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(cellValue);
                        }}
                      >
                        <RiEdit2Fill className="white-icon" />
                      </div>
                    )}
                    {cellValue}
                  </>
                )}

                {/* Expand/collapse if sub-technique is present */}
                {cellValue &&
                  hasSubTechnique(cellValue) && (
                    <div
                      className="sidebar"
                      aria-label="expand collapse"
                      onClick={(e) => {
                        e.stopPropagation();
                        manage_columns(
                          typeof cellValue === 'string' ? cellValue.toLowerCase() : '',
                          rowIndex,
                          colIndex
                        );
                      }}
                    >
                      <RiExpandLeftRightFill />
                    </div>
                  )}
              </td>
            );
          })}
        </tr>
      ))
    );
  };

  const handleKeyDown = (event) => {
    const { row, col } = focusedCell;
    const currentCell = tableRef.current?.querySelector(
      `tr:nth-child(${row + 1}) td:nth-child(${col + 1})`,
    );

    if (!currentCell) return;

    const subCells = currentCell.querySelectorAll('li');
    const isSubcell = subCells.length > 0;

    switch (event.key) {
      case 'ArrowDown':
        if (isSubcell) {
          // If there are <li> elements, navigate to the next <li>
          if (focusedLiIndex !== null && focusedLiIndex < subCells.length - 1) {
            setFocusedLiIndex(focusedLiIndex + 1);
            subCells[focusedLiIndex + 1]?.focus();
            subCells[focusedLiIndex].style.backgroundColor = NO_FOCUS;
            subCells[focusedLiIndex + 1].style.backgroundColor = FOCUS;
          } else if (focusedLiIndex === null) {
            setFocusedLiIndex(0); // Focus on the first <li> if none is focused
            subCells[0]?.focus();
            subCells[0].style.backgroundColor = FOCUS;
          }
        } else {
          // If no subcells, move to the next row's cell
          if (row < tableData.length - 1) {
            setFocusedCell({ row: row + 1, col });
            setFocusedLiIndex(null); // Reset focused <li> index when changing cells
          }
        }
        break;

      case 'ArrowUp':
        if (isSubcell && focusedLiIndex > 0) {
          // If there are <li> elements, navigate to the previous <li>
          setFocusedLiIndex(focusedLiIndex - 1);
          subCells[focusedLiIndex - 1]?.focus();
          subCells[focusedLiIndex - 1].style.backgroundColor = FOCUS;
          subCells[focusedLiIndex].style.backgroundColor = NO_FOCUS;
        } else if (!isSubcell && row > 0) {
          // If no subcells, move to the previous row's cell
          setFocusedCell({ row: row - 1, col });
          setFocusedLiIndex(null); // Reset focused <li> index when changing cells
        }
        break;

      case 'ArrowRight':
        // Move to the next <td> in the same row
        if (col < currentCell.parentElement.children.length - 1) {
          setFocusedCell({ row, col: col + 1 });
          if (focusedLiIndex !== null)
            subCells[focusedLiIndex].style.backgroundColor = NO_FOCUS;
          setFocusedLiIndex(null); // Reset focused <li> when moving to another <td>
        }
        break;

      case 'ArrowLeft':
        // Move to the previous <td> in the same row
        if (col > 0) {
          setFocusedCell({ row, col: col - 1 });
          if (focusedLiIndex !== null)
            subCells[focusedLiIndex].style.backgroundColor = NO_FOCUS;
          setFocusedLiIndex(null); // Reset focused <li> when moving to another <td>
        }
        break;

      case 'Enter':
        // Handle Enter key press
        if (isSubcell) {
          // If focused on a subcell <li>, get its data
          const focusedLi = document.activeElement;
          if (focusedLi && focusedLi.tagName === 'LI') {
            const value = focusedLi.innerText;
            onValueClick(value);
          }
        } else {
          // If no subcells, get the main cell data
          const data = tableData[row];
          if (!data) return;

          const columnKey = Object.keys(data)[col];
          const value = data[columnKey];
          onValueClick(value);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    // Ensure that when a cell with <li> elements is focused, the first <li> gets focus
    const currentCell = tableRef.current?.querySelector(
      `tr:nth-child(${focusedCell.row + 1}) td:nth-child(${focusedCell.col + 1})`,
    );

    if (currentCell) {
      const subCells = currentCell.querySelectorAll('li');
      if (subCells.length > 0) {
        // Focus the first <li> if it has <li> elements and none is focused
        if (focusedLiIndex === null) {
          setFocusedLiIndex(0);
          subCells[0]?.focus();
          subCells[0].style.backgroundColor = FOCUS;
        } else {
          subCells[focusedLiIndex]?.focus();
          subCells[focusedLiIndex].style.backgroundColor = FOCUS;
        }
      }
    }

    handleCellColoring()
  }, [focusedCell, focusedLiIndex, cellColors]);

  const handleCellColoring = () => {
    if (tableData && tableData.length > 0) {
      const headers = Object.keys(tableData[0]);

      for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
        for (let colIndex = 0; colIndex < headers.length; colIndex++) {
          const currentCell = tableRef.current?.querySelector(
            `tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`,
          );

          if (!currentCell) return;

          const subCells = currentCell.querySelectorAll('li');
          const isSubcell = subCells.length > 0;

          if (isSubcell) {
            for (let i = 0; i < subCells.length; i++) {
              subCells[i].style.backgroundColor = cellColors[subCells[i]?.textContent]
            }
          } else {
            currentCell.style.backgroundColor = cellColors[tableData[rowIndex][colIndex]];
          }
        }
      }
    }
  }
  return (
    <nav tabIndex={0} onKeyDown={handleKeyDown} ref={tableRef}>
      <table className={`table-container ${isPanelOpen ? 'shrink' : ''}`}>
        <thead>
          <tr>{renderHeaders() || <th colSpan={4}>Loading...</th>}</tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </nav>
  );
};

export default TechniquesTable;