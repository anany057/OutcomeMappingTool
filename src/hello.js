const CoAttainmentDay2Day = async () => {
    // Check if data2 has been loaded
    if (!data2 || data2.length === 0) {
        console.error("No data loaded for calculations!");
        return;
    }

    // Initialize variables, here max marks
    if(T_set==false){
    const Target=window.prompt("Enter the Target Attainment : ");
    setTarget(Target);
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
    for (let i = 5; i <61; i++) {
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
        data2[i]['__EMPTY_11']=totalMarksC275_3_5;
        data2[i]['__EMPTY_7']=totalMarksC275_4;
        
        //calculating day2day
        data2[i]['__EMPTY_12']=totalMarksC275_1_2+totalMarksC275_3_5+totalMarksC275_4;
        
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
        if (percentageC275_1 >= Target) studentsAboveTargetC275_1++;
        console.log("studentsabove Target 1",studentsAboveTargetC275_1);
        if (percentageC275_4 >= Target) studentsAboveTargetC275_4++;
        console.log("studentsabove Target 4",studentsAboveTargetC275_4);
        if (percentageC275_2 >= Target) studentsAboveTargetC275_2++;
        console.log("studentsabove Target 2",studentsAboveTargetC275_2);

        if (percentageC275_3 >= Target) studentsAboveTargetC275_3++;
        console.log("studentsabove Target 3",studentsAboveTargetC275_3);

        if (percentageC275_5 >= Target) studentsAboveTargetC275_5++;
        console.log("studentsabove Target 5",studentsAboveTargetC275_5);



    }
       
    data2[75]['__EMPTY_6'] = studentsAboveTargetC275_1;
    data2[75]['__EMPTY_7'] = studentsAboveTargetC275_2;
    data2[75]['__EMPTY_8']=studentsAboveTargetC275_3;
    data2[75]['__EMPTY_9'] =studentsAboveTargetC275_4;
    data2[75]['__EMPTY_10']=studentsAboveTargetC275_5;

    data2[76]['__EMPTY_6'] = ((studentsAboveTargetC275_1 / totalStudents) * 100).toFixed(2);
    data2[76]['__EMPTY_7'] = ((studentsAboveTargetC275_2 / totalStudents) * 100).toFixed(2);
    data2[76]['__EMPTY_8'] = ((studentsAboveTargetC275_3 / totalStudents) * 100).toFixed(2);
    data2[76]['__EMPTY_9'] = ((studentsAboveTargetC275_4 / totalStudents) * 100).toFixed(2);
    data2[76]['__EMPTY_10'] =((studentsAboveTargetC275_5 / totalStudents) * 100).toFixed(2);



    console.log("Total students ",totalStudents);
    data2[78]['__EMPTY_6'] = totalStudentsC275_1;
    data2[78]['__EMPTY_7']=totalStudentsC275_2;
    data2[78]['__EMPTY_8']=totalStudentsC275_3;
    data2[78]['__EMPTY_9']=totalStudentsC275_4;
    data2[78]['__EMPTY_10']=totalStudentsC275_5;


// students appeared 
    data2[79]['__EMPTY_6'] = totalStudents;
    

//co attainment
const categories = [];



for (let i = 6; i <= 10; i++) {
    const value = parseFloat(data2[76]['__EMPTY_' + i]);
    
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
    data2[76]['__EMPTY_' + i] = categories[i - 6];
}




    
    // Update state with modified data2
    setData2(data2);
    // setModified(true);
    console.log(data2);
    setModified3(true);
};