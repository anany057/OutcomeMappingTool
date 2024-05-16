 
     import { useState } from "react";
     import { useEffect } from "react";
     import CEOAttainmentChart from './CEOAttainmentChart';
   
     import * as XLSX from "xlsx";
     import './footer.css';
    
      import './App.css';
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
     
     function App({selectedData = 'data',chartFalse}) {
      /// props
      console.log('Selected data:', selectedData);
       const [isExpanded, setIsExpanded] = useState(true);
       const [displayedRows, setDisplayedRows] = useState(10); // Initial number of rows to display
       const [data, setData] = useState([]); //Assessment Tools
       const[data1,setData1]=useState([]);//Mid-vivaIT
       const[data2,setData2]=useState([]);//D2D-IT
       const[data3,setData3]=useState([]);//END-VIVA-IT
       const[data4,setData4]=useState([]);//EXIT-FEEDBACK-IT
       const[isModified,setModified]=useState(false);
       const[isModified2,setModified2]=useState(false);
       const[isModified3,setModified3]=useState(false);
       const[Target,setTarget]=useState(50);
      const[T_set,setT]=useState(false);
      const[attainment,setAttainMent]=useState({});
      const [toggled, setToggled] = useState(false);

      // const [foundC2751, setFoundC2751] = useState([]); // Array for sheet names with C275.1
      const [workbook, setWorkbook] = useState(null);
     //  const [foundC2751, setFoundC2751] = useState(() => new Set());
     //  const [foundC2752, setFoundC2752] = useState(() => new Set());
     //  const [foundC2753, setFoundC2753] = useState(() => new Set());
     //  const [foundC2754, setFoundC2754] = useState(() => new Set());
     //  const [foundC2755, setFoundC2755] = useState(() => new Set());
      
     // const[foundRowIndex,setRowIndex]=useState(null)
     // const[foundColumnIndex,setColumnIndex]=useState(null);
     const[isError,setIsError]=useState(false);


     const handleClick = (event) => {
      // Check if the click occurred on the left side of the window
      if (event.clientX < 300) { // Assuming the left side starts at 0px and goes up to 50px
        setToggled(false); // Toggle the state
      }
    };

    useEffect(() => {
      window.addEventListener('click', handleClick);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }, []);

// some more changes ----->

const stateSetterMap = {
  data: data,
  data1: data1,
  data2: data2,
  data3: data3,
  data4: data4,
  data8:data2,
  data9:data2,
  // Add more mappings as needed
};




const nameRenderMap={

  data:"Assessment Tools",
  data1:"Mid viva Marks",
  data2:"Day to Day Marks",
  data3:"End Viva Marks",
  data4:"Exit Feedback",
  data8:"Evaluation 1 Marks",
  data9:"Evaluation 2 Marks",

};





     const handleDownload = () => {
      // Check if data has been modified
      if (!isModified) {
        console.log("Data has not been modified. No download necessary.");
        return;
      }
    
      // Combine all data arrays into one
      const allData = [data, data1, data2, data3, data4];
      const wb = XLSX.utils.book_new();
      
      for(let i = 0; i < allData.length; i++) {
        // Create a new worksheet from the combined data
        const ws = XLSX.utils.json_to_sheet(allData[i]);
      console.log("sheet name ",i,allData[i]);
        // Set column widths (optional)
        const columnWidths = [{ wch: 30 }, { wch: 30 }]; // Example widths
        ws['!cols'] = columnWidths;
      
        // Generate a new workbook and add the worksheet
        XLSX.utils.book_append_sheet(wb, ws, `Sheet${i + 1}`);
      }
    
      // Generate a downloadable file with the updated data
      XLSX.writeFile(wb, 'updated_data.xlsx');
    };
    
    
    
    
     
       const handleFileUpload = (e) => {
         const reader = new FileReader();
         reader.readAsBinaryString(e.target.files[0]);
         reader.onload = (e) => {
           const data = e.target.result;
           const workbook = XLSX.read(data, { type: "binary" });
           setWorkbook(workbook);
     
           // Check for the presence of the "Assessment Tools" sheet
           const sheetName = workbook.SheetNames.find(
             (sheet) => sheet === "Assessment Tools"
           );
     console.log("My sheet Name",`${sheetName}`);
     
           if (sheetName) {
             const sheet = workbook.Sheets[sheetName];
             const parsedData = XLSX.utils.sheet_to_json(sheet);
             setData(parsedData); // Update component state with parsed data
           } else {
             console.error("Sheet 'Assessment Tools' not found in Excel file.");
           }
     
           const sheetName2=workbook.SheetNames.find((sheet)=>sheet==="Mid Viva IT");
     const parsedDataMid=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName2]);
     setData1(parsedDataMid);
     
     const sheetName3=workbook.SheetNames.find((sheet)=>sheet==="D2D IT");
     const parsedDataD2D=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName3]);
     setData2(parsedDataD2D);
     
     const sheetName4=workbook.SheetNames.find((sheet)=>sheet==="End Viva IT");
     const parsedDataEnd=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName4]);
     setData3(parsedDataEnd);
     
     const sheetName5=workbook.SheetNames.find((sheet)=>sheet==="Exit Feedback IT");
     const parsedDataExit=XLSX.utils.sheet_to_json(workbook.Sheets[sheetName5]);
     setData4(parsedDataExit);
     
     
     
         };
         alert("File Uploaded Successfully");
       };
       const handleExpandClick = () => {
         setIsExpanded(!isExpanded);
         setDisplayedRows(isExpanded ? stateSetterMap[selectedData].length : 10); // Toggle displayed rows based on expansion state
       };
     
       //new update 

       const CoAttainmentDay2Day = async () => {
        // Check if data2 has been loaded
        if (!data2 || data2.length === 0) {
            console.error("No data loaded for calculations!");
            return;
        }
    
        // Initialize variables, here max marks
       // Initialize variables, here max marks
  if (!T_set) {
    const newTarget = window.prompt("Enter the Target Attainment : ");
    setTarget(newTarget);
    setT(true);
  }
        //MAXIMUM MARKS ARE NOW TAKEN 
        let maxMarksC275_1 =window.prompt("Enter maximum marks for CO275_1 :");
        let maxMarksC275_2 = window.prompt("Enter maximum marks for CO275_2 :");
        let maxMarksC275_3 = window.prompt("Enter maximum marks for CO275_3 :");
        let maxMarksC275_4 = window.prompt("Enter maximum marks for CO275_4 :");
        let maxMarksC275_5 =window.prompt("Enter maximum marks for CO275_5 : ");
    
    
    //variable for total marks , line by line 
        let totalMarksC275_1_2 = 0;
        let totalMarksC275_4 = 0;
        let totalMarksC275_3_5 = 0;
    
    //calculating total students , each attainment wise
        let totalStudentsC275_1 = 0;
        let totalStudentsC275_2 = 0;
        let totalStudentsC275_3 = 0;
        let totalStudentsC275_4 = 0;
        let totalStudentsC275_5 = 0;
    
        //calculating target wise , number of students for calculating 
    
        let studentsAboveTargetC275_1 = 0;
        let studentsAboveTargetC275_2 = 0;
        let studentsAboveTargetC275_3 = 0;
        let studentsAboveTargetC275_4 = 0;
        let studentsAboveTargetC275_5 = 0;
    
        let totalStudents = 0;
    
        // Iterate through data2 to perform calculations
        for (let i = 4; i <61; i++) {
            const row = data2[i];
    
            // Get the values from __EMPTY_3 and __EMPTY_4
            let valueC275_1=0.0;
            let valueC275_2=0.0;
            let valueC275_3=0.0;
            let valueC275_4=0.0;
            let valueC275_5=0.0;
    
             valueC275_1 = parseFloat(row['__EMPTY_3']);
            
             valueC275_2 = parseFloat(row['__EMPTY_4']);
             valueC275_4 = parseFloat(row['__EMPTY_6']);
            valueC275_3  = parseFloat(row['__EMPTY_9']);
            valueC275_5  = parseFloat(row['__EMPTY_10']);
    
          totalMarksC275_1_2 = valueC275_2+valueC275_1;//to be used for D2D
            totalMarksC275_4 = valueC275_4;//to be used for D2D
            totalMarksC275_3_5=valueC275_3+valueC275_5;// to be used for D2D
    
            // Calculate percentages and categorize students
            let percentageC275_1 = (valueC275_1 / maxMarksC275_1) * 100;
            let percentageC275_4 = (valueC275_4 / maxMarksC275_4) * 100;
            let percentageC275_2 = (valueC275_2 / maxMarksC275_2) * 100;
            let percentageC275_3 = (valueC275_3 / maxMarksC275_3) * 100;
            let percentageC275_5 = (valueC275_5 / maxMarksC275_5) * 100;
    
            data2[i]['__EMPTY_5'] =totalMarksC275_1_2;// adding total sum 
            console.log(totalMarksC275_1_2);
            data2[i]['__EMPTY_11']=totalMarksC275_3_5;
            console.log(totalMarksC275_3_5)
            data2[i]['__EMPTY_7']=totalMarksC275_4;
            console.log(totalMarksC275_4);
            //calculating day2day
            data2[i]['__EMPTY_12']=totalMarksC275_1_2+totalMarksC275_3_5+totalMarksC275_4+data2[i]['__EMPTY_8'];
            console.log(`${i}`,data2[i]['__EMPTY_12']);
            
            data2[i]['__EMPTY_13'] = percentageC275_1.toFixed(2);//attainment by each student for 1 Co
            data2[i]['__EMPTY_14'] = percentageC275_2.toFixed(2);
            data2[i]['__EMPTY_15'] = percentageC275_3.toFixed(2);
            data2[i]['__EMPTY_16'] = percentageC275_4.toFixed(2);
            data2[i]['__EMPTY_17'] = percentageC275_5.toFixed(2);
            totalStudentsC275_1+=1;
            totalStudentsC275_2+=1;
            totalStudentsC275_3+=1;
            totalStudentsC275_5+=1;
            totalStudentsC275_4+=1;
            totalStudents+=1;
            
            // Calculate number of students scoring above 50%
           // Calculate number of students in each category
if (percentageC275_1 >= Target) studentsAboveTargetC275_1++;
if (percentageC275_2 >= Target) studentsAboveTargetC275_2++;
if (percentageC275_3 >= Target) studentsAboveTargetC275_3++;
if (percentageC275_4 >= Target) studentsAboveTargetC275_4++;
if (percentageC275_5 >= Target) studentsAboveTargetC275_5++;

    
    
    
        }
           
      //   if (data2[75]) {
      //     data2[75]['__EMPTY_6'] = studentsAboveTargetC275_1;
      // }
      data2[67]['__EMPTY_6'] = studentsAboveTargetC275_1;
      data2[67]['__EMPTY_7'] = studentsAboveTargetC275_2;
      data2[67]['__EMPTY_8'] = studentsAboveTargetC275_3;
      data2[67]['__EMPTY_9'] = studentsAboveTargetC275_4;
      data2[67]['__EMPTY_10'] = studentsAboveTargetC275_5;
      
      data2[68]['__EMPTY_6'] = ((studentsAboveTargetC275_1 / totalStudentsC275_1) * 100).toFixed(2);
      data2[68]['__EMPTY_7'] = ((studentsAboveTargetC275_2 / totalStudentsC275_2) * 100).toFixed(2);
      data2[68]['__EMPTY_8'] = ((studentsAboveTargetC275_3 / totalStudentsC275_3) * 100).toFixed(2);
      data2[68]['__EMPTY_9'] = ((studentsAboveTargetC275_4 / totalStudentsC275_4) * 100).toFixed(2);
      data2[68]['__EMPTY_10'] = ((studentsAboveTargetC275_5 /totalStudentsC275_5) * 100).toFixed(2);
      
      // console.log("Total students ", totalStudents);
     
      data2[70]['__EMPTY_6'] = totalStudentsC275_1;
      data2[70]['__EMPTY_7'] = totalStudentsC275_2;
      data2[70]['__EMPTY_8'] = totalStudentsC275_3;
      data2[70]['__EMPTY_9'] = totalStudentsC275_4;
       data2[70]['__EMPTY_10'] = totalStudentsC275_5;
       
       console.log(data2[69]);
       console.log(data2[68]);
       console.log(data2[67]);
       console.log(data2[66]);
       console.log(data2[65]);

      
       
      // // Students appeared
       data2[71]['__EMPTY_6'] = totalStudents;
      
    
    //co attainment
     const categories = [];
    
    
    let avgAttainmentAcross=0;
    let counter=0;
    for (let i = 6; i <= 10; i++) {
        const value = parseFloat(data2[68]['__EMPTY_' + i]);
        
        if (value >= 80) {
            categories.push(3);
        } else if (value >= 70) {
            categories.push(2);
        } else if (value >= 60) {
            categories.push(1);
        } else {
            categories.push(0);
        }
    
        // Corrected line to access data2 instead of data
        data2[69]['__EMPTY_' + i] = categories[i - 6];
        console.log(data2[69]);
        //setting the attainment
avgAttainmentAcross+=value;
        counter+=1;
    }

    avgAttainmentAcross=avgAttainmentAcross/counter;

    setAttainMent(avgAttainmentAcross);

    console.log("Data at row 74: ",data2[70]);
    
    
    
        
        // Update state with modified data2
        setData2(data2);
        // setModified(true);
        //console.log(data2);
        setModified3(true);
        setToggled(true);
    };









       const CoAttainment = async () => {
        // Check if data3 has been loaded
        if (!data3 || data3.length === 0) {
            console.error("No data loaded for calculations!");
            return;
        }
    
        // Initialize variables
        let maxMarksC275_3 = 10;
        let maxMarksC275_4 = 10;
        let totalMarksC275_3 = 0;
        let totalMarksC275_4 = 0;
        let totalStudentsC275_3 = 0;
        let totalStudentsC275_4 = 0;
        let studentsAbove50C275_3 = 0;
        let studentsAbove50C275_4 = 0;
        let totalStudents = 0;
    
        // Iterate through data3 to perform calculations
        for (let i = 7; i <65; i++) {
            const row = data3[i];
    
            // Get the values from __EMPTY_3 and __EMPTY_4
            let valueC275_3=0.0;
            let valueC275_4=0.0;
            
             valueC275_3 = parseFloat(row['__EMPTY_3']);
             valueC275_4 = parseFloat(row['__EMPTY_4']);
            
            
   
          totalMarksC275_3 += valueC275_3;
            totalMarksC275_4 += valueC275_4;

            // Calculate percentages and categorize students
            let percentageC275_3 = (valueC275_3 / maxMarksC275_3) * 100;
            let percentageC275_4 = (valueC275_4 / maxMarksC275_4) * 100;

            data3[i]['__EMPTY_5'] = valueC275_3 + valueC275_4;// adding total sum 
            data3[i]['__EMPTY_6'] = percentageC275_3.toFixed(2);//attainment by each student for 1 Co
            data3[i]['__EMPTY_7'] = percentageC275_4.toFixed(2);
            if(i!=8){
            totalStudentsC275_3+=1;;
            totalStudentsC275_4+=1;
            totalStudents+=1;
            }
            // Calculate number of students scoring above 50%
            if (percentageC275_3 >= Target) studentsAbove50C275_3++;
            console.log("studentsabove 50 3",studentsAbove50C275_3);
            if (percentageC275_4 >= Target) studentsAbove50C275_4++;
            console.log("studentsabove 50 4",studentsAbove50C275_4);

    
            // Calculate percentages and categorize students
           
    
  
    
            // Increment total students
            
        }
     
        data3[64]['__EMPTY_6'] = studentsAbove50C275_3;
        data3[64]['__EMPTY_7'] = studentsAbove50C275_4;
        data3[65]['__EMPTY_6'] = ((studentsAbove50C275_3 / totalStudents) * 100).toFixed(2);
        console.log("PERCENTAGE",data3[69]['__EMPTY_6']);
        data3[65]['__EMPTY_7'] = ((studentsAbove50C275_4 / totalStudents) * 100).toFixed(2);
        console.log("Total students ",totalStudents);
        data3[67]['__EMPTY_6'] = totalStudents;
        data3[67]['__EMPTY_7'] = totalStudents;

        data3[68]['__EMPTY_6'] = totalStudents;
        data3[68]['__EMPTY_7'] = totalStudents;


        if(data3[65]['__EMPTY_6']>=80){
          data3[66]['__EMPTY_6']=3;
        }else if( data3[65]['__EMPTY_6']>=70&& data3[65]['__EMPTY_6']<80){
          data3[66]['__EMPTY_6']=2;
        }else if( data3[65]['__EMPTY_6']>=60&& data3[65]['__EMPTY_6']<70){
          data3[66]['__EMPTY_6']=1;
        }else{
          data3[66]['__EMPTY_6']=0;
        }

        if(data3[65]['__EMPTY_7']>=80){
          data3[66]['__EMPTY_7']=3;
        }else if( data3[65]['__EMPTY_7']>=70&& data3[65]['__EMPTY_7']<80){
          data3[66]['__EMPTY_7']=2;
        }else if( data3[65]['__EMPTY_7']>=60&& data3[65]['__EMPTY_7']<70){
          data3[66]['__EMPTY_7']=1;
        }else{
          data3[66]['__EMPTY_7']=0;
        }

let average=data3[65]['__EMPTY_6']+data3[65]['__EMPTY_7']/2;
setAttainMent(average);
        
        // Update state with modified data3
        setData3(data3);
        // setModified(true);
        console.log(data3);
        setModified2(true);
        setToggled(true);
    };
    
     
       
       const fetchValues = async () => {
         if (!data || Object.keys(data).length === 0) {
           console.error("No data loaded to process!");
           return;
         }
     
        
        
       
         let foundRowIndex = null;
         let foundColumnIndex = null;
       
         for (let i = 0; i < data.length; i++) {
           const row = data[i];
       
           // Find the column index for "CO Outcome"
           const columnIndex = Object.keys(row).findIndex((header) => header === "2023-24, Odd Semester");
           if (columnIndex !== -1) {
             foundRowIndex = i;
             foundColumnIndex = columnIndex;
             break;
           }
         }
        
         if (foundRowIndex !== null && foundColumnIndex !== null) {
           console.log("2023 found at:", `Row: ${foundRowIndex}, Column: ${foundColumnIndex}`);
           console.log("checking correctivity of indes",`Row:${foundRowIndex+6},column:${foundColumnIndex+2}`);
         } else {
           console.log("2023 not found in the data.");
         }
     
         if (!data1 || !data2 || !data3 || !data4) {
           console.error("Data not yet loaded!");
           return;
         }
       
         const sheetData = [];
     
     if (data1.length > 0) {
         sheetData.push(data1);
     }
     
     if (data2.length > 0) {
         sheetData.push(data2);
     }
     
     if (data3.length > 0) {
         sheetData.push(data3);
     }
     
     if (data4.length > 0) {
         sheetData.push(data4);
     }
     if(data.length>0){
       sheetData.push(data);
     }
         const searchValues = ["C275.1", "C275.2", "C275.3", "C275.4", "C275.5"];
     
         const foundValues = {
           "C275.1": [],
           "C275.2": [],
           "C275.3": [],
           "C275.4": [],
           "C275.5": [],
         };
     
         for (let i = 0; i <sheetData.length-1; i++) {
         
           const currentSheet = sheetData[i];//sheet 1 , sheet 2 , sheet3 , sheet 4
     
           if (!currentSheet || !currentSheet.length) {
             console.error("Sheet data is undefined or empty.");
             continue; // Skip to the next iteration if currentSheet is undefined or empty
           }
           console.log("Sheet data:",i, currentSheet);
           console.log("Sheet data attainment:",sheetData[4]);
           //  const sheetName = Object.keys(data)[i]; // Get corresponding sheet name
           
           const sheetName = workbook.SheetNames.find((sheet) => {
       // Access the value of the outer loop index here
       switch (i) {
         case 0:
           // Case for first iteration (i = 0)
           return sheet === "Mid Viva IT";
         case 1:
           // Case for second iteration (i = 1)
           return sheet === "D2D IT";
         case 2:
           // Case for third iteration (i = 2)
           return sheet === "End Viva IT";
           case 3:
           // Case for third iteration (i = 3)
           return sheet === "Exit Feedback IT"; 
         default:
           return false; // Default case if none of the conditions match
       }
     }); 
     if(sheetName===false){
     alert("Error in fetching SheetName");
     }
     
     
     
     
       // console.log("Hello Please",`${sheetName}`);//sheetName log 
     
           for (let j = 0; j < currentSheet.length; j++) {
             let row = currentSheet[j];//current sheet 
             
             // Convert row to an array if it's an object
             if (typeof row === "object" && !Array.isArray(row)) {
               row = Object.values(row);
             }
             
             for (const searchValue of searchValues) {
               if (row.includes(searchValue)) {
                 // Check if the key exists in foundValues
                 if (!(searchValue in foundValues)) {
                   // If the key doesn't exist, create a new empty array
                   foundValues[searchValue] = [];
                 }
             
                 // Check if sheetName already exists in the array
                 if (!foundValues[searchValue].some(value => value.trim() === sheetName)) {
                   // If sheetName is not already in the array, add it
                   foundValues[searchValue].push(" " + sheetName.trim());
                   console.log("I am inside ", `${searchValue}`);
                   console.log("Value inside it is ", `${foundValues[searchValue]}`);
               }
               }
             }
           }
         }
       //   if (foundC2751.size > 0) {
       //     // foundC2751 has values
       //     console.log("foundC2751 has values");
       // } else {
       //     // foundC2751 is empty
       //     console.log("foundC2751 is empty");
       // }
       
     
       
         
         // let modifiedData = [...data]; // Create a copy of the original data
        // let isError = false; // Initialize isError to false
         console.log("Reached at line 220 in vs code");
      
       for (let i = foundRowIndex + 5; i < 11; i++) {
         const currentSearchValue = searchValues[i - foundRowIndex - 5]; // Calculate corresponding index
         console.log("Reached at line 223 in vs code");
         console.log("Data length is", data.length);
         console.log("data[i] is ", data[i]);
         console.log("foundColumnIndex", foundColumnIndex + 3);
         
         if (i < data.length && typeof data[i] === 'object') {
             console.log("Reached at line 225 in vs code");
             
             // Check if data[i] is an object
             if (Object.keys(data[i]).length > 0) {
                 // Find the column dynamically based on the keys in the object
                 const columnIndex = Object.keys(data[i]).find(key => key.includes('__EMPTY_1'));
                 
                 if (columnIndex) {
                     console.log("Index at which we are modifying ", `${i},${columnIndex}`);
                     data[i][columnIndex] = foundValues[currentSearchValue];
                     console.log("And the value is ", `${foundValues[currentSearchValue]}`);
                 } else {
                     console.log("Column '__EMPTY_1' not found in row ", i);
                     setIsError(true); // Set isError to true if column not found
                     break; // Exit the loop to prevent further modifications
                 }
             } else {
                 console.log("Row ", i, " is empty");
                 setIsError(true); // Set isError to true if row is empty
                 break; // Exit the loop to prevent further modifications
             }
         } else {
             console.log("Out-of-bounds access or data[i] is not an object");
             setIsError(true); // Set isError to true for out-of-bounds access or incorrect data structure
             break; // Exit the loop to prevent further modifications
         }
     }
     
     
     
     
         if (isError) {
             console.error("Error: Array index out of bounds!");
         } else {
             setData(data); // Update state with modified data
         }
         
         setModified(true);
         
         
     
       
       }; 
     
       return (
        // const nameRenderMap={

        //   data:"Assessment Tools",
        //   data1:"Mid viva Marks",
        //   data2:"Day to Day Marks",
        //   data3:"End Viva Marks",
        //   data4:"Exit Feedback",
        
        // };
        
         <div className="App">
         
{(isModified2||isModified3)&&(toggled) && (
  <div style={{ height: '60px', width: '100px', objectFit: 'contain', marginLeft:'-21.5%' ,zIndex:'1000',position:'fixed',marginTop:'19%' }}>
    {console.log(attainment, "attainment is")}
    {/* Assuming nameRenderMap is defined and selectedData is a valid index */}
    <CEOAttainmentChart attainment={attainment} nameRenderMap={nameRenderMap} selectedData={selectedData} />
    
  </div>
)}


     <div className="file-input-container" style={{marginBottom:"-1rem"}}>
      <h6 style={{fontWeight:'600'}}>{nameRenderMap[selectedData]}</h6>
     </div>
           
           <div className="file-input-container">
           <input  className="file-input-button" type="file" accept=".xlsx ,.xls" onChange={handleFileUpload} /><i class="fa-solid fa-upload" style={{marginLeft:'-2rem',color:'white'}}></i></div>
     {/* editing here */}
     {stateSetterMap[selectedData] && stateSetterMap[selectedData].length > 0 && (
  <div className="table-container">
    {!isExpanded && <button className="collapse-button" onClick={handleExpandClick}>Collapse<i class="fa-solid fa-minus" style={{marginLeft:'5px'}}></i></button>}
    <table className="table">
      <thead>
        <tr>
          {Object.keys(stateSetterMap[selectedData][0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {stateSetterMap[selectedData].slice(0, displayedRows).map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {isExpanded && <button className="expand-button" onClick={handleExpandClick}>Expand All<i class="fa-solid fa-expand" style={{marginLeft:'5px'}}></i></button>}
    <div>
      {/* Select sheet and column (if required) */}
      {isExpanded && selectedData==='data'&& <button className="fetch-values-button" onClick={fetchValues}>Fetch Values</button>}
      {isExpanded && selectedData === 'data3' && <button className="fetch-values-button" onClick={CoAttainment}>CoAttainment(End-Term)</button>}
      {isExpanded && selectedData === 'data2' && <button className="fetch-values-button" onClick={CoAttainmentDay2Day }>CoAttainment(D2D)</button>}


      {/* Display table with updated data */}
      {(isModified||isModified2) && <button className="download-button" onClick={handleDownload}>Download<i class="fa-solid fa-download" style={{marginLeft:'5px'}}></i></button>}
    </div>
  </div>
)}

     

     
     
           
         </div>
       );
     }
     
     export default App;
     