import { Card, CardContent, Dialog, DialogContent, Grid } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import BaseRequest from '../helpers/BaseRequest'
import AddComment from './AddComment';
import ChildDataService from './ChildDataService';
import EnhancedTable, { HeadCell } from './Table';

export interface PastLessonsData {
    fullName: string;
    date_cours: string;
    item: any;
}


export default function PastLessons() {
    const [rows, setRows] = useState<PastLessonsData[]>([]);
    const [showAddComment, setShowAddComment] = useState(false);
    const [course, setCourse] = useState<any>();


    useEffect(() => {
        getPastCours();

    }, [])

    const getPastCours = () => {
        const formData = new FormData();
        const json = { option: "past", id_interv: localStorage.getItem("id") || "" }
        formData.append("data", JSON.stringify(json))
        BaseRequest("getCours", formData).then((res: { data: any[] }) => {
            console.log(res);
            // let i: AutoCompleteList[] = [];
            let teacherData: PastLessonsData[] = [];
            res.data.forEach((item) => {
                //   i.push({ id: item.id_elev, value: `${item.prenom} ${item.nom}` });
                teacherData.push(createData(`${item.student_firstname} ${item.student_lastname}`, item.date_cours, item));
            })
            setRows(teacherData)
        })
            .catch((e) => {
                console.log(e);
            });
    }
    const clickIcon = (item: any) => {
        setCourse(item);
        setShowAddComment(true);
    };
    const CloseDialog = () => {
        setShowAddComment(false);
        ChildDataService.commentNext$.next()
    };
    const headCells: HeadCell[] = [

        { id: "fullName", label: "שם", isSortable: true },
        { id: "date_cours", label: "תאריך", isSortable: true },
        {
            id: "edit",
            label: "הערה",
            type: "icon",
            handleClickIcon: clickIcon,
            icon: <AddCircle />,
            isSortable: false,
        },
    ];


    const createData = (
        fullName: string,
        date_cours: string,
        item: any
    ): PastLessonsData => {
        return {
            fullName,
            date_cours,
            item,
        };
    };
    return (
        <>

            <Grid
                // spacing={2}
                direction="column"
                container
                justify="flex-start"
            >
                <Grid
                    direction="row"
                    item
                    xs={12}
                    justify="flex-end"
                    container
                >
                    <Grid item xs={3}>
                        <p style={{ textDecoration: "underline" }} className="primary">השיעורים שעברו</p>
                    </Grid>
                </Grid> <Grid item xs={12}>
                    <EnhancedTable headCells={headCells} rows={rows} />
                </Grid>
            </Grid>

            <Dialog
                onClose={() => {
                    setShowAddComment(false);
                }}
                open={showAddComment}
            >
                <DialogContent style={{ width: 500, height: "210" }}>
                    <AddComment ok={CloseDialog} course={course} />
                </DialogContent>
            </Dialog>
        </>
    )
}