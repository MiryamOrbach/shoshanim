import React, { useEffect, useState } from 'react'
import { PDFDownloadLink, Document, Page, View, Text, Font } from '@react-pdf/renderer'
import BaseRequest from '../helpers/BaseRequest';
import { Table } from '@material-ui/core';
// import font from '/styles/localFonts/Poppins-Medium.ttf

const MyDoc = (props: any) => {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        console.log("sssssssss", props)
        getCourses();
    }, [])
    const createData = (price: any, childName: any, date: any) => {
        return {
            price,
            childName,
            date,
        };
    };
    const getCourses = () => {
        const data = {
            start: "2020-10-01",
            end: "2020-10-25",
            id_interv: "2",
        };
        const form = new FormData();
        form.append("data", JSON.stringify(data));
        BaseRequest("getCours", form).then((res) => {
            console.log("ggggggggg", res);
            let rowsData: any = [];
            res.success &&
                res.data.forEach((item: any) => {
                    rowsData.push(
                        createData(
                            item.tarif_cours,
                            `${item.student_firstname} ${item.student_lastname}`,
                            item.date_cours
                        )
                    );
                });
            setRows(rowsData);
            //   setPrint(true);
        });
    };
    Font.register({
        family: "Rubik",
        src: "/fonts/Rubik-Regular.ttf",
    });
    return (
        <Document>
            <Page>
                <View>
                    <Text style={{ fontFamily: "Rubik" }}>  חלדחג</Text>
                </View>
            </Page>
        </Document>
    )
}
export default MyDoc;