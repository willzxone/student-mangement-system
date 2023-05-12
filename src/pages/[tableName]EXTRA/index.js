// import { useState } from "react";
// import { getTables } from "../../../db-requests/getTables";
// import EmpTable from "../../../components/emp_table"
// const Table = (props) => {
//     const [tabledata, setData] = useState(props.data);

//     const clickHandle = async ()=>{
//       const res = await fetch(`http://localhost:3000/api/regions`);
//       const result = await res.json();
//       setData(result);
//     }

//     return (
//       <>
//         <EmpTable data={tabledata}/>
//         <button onClick={clickHandle}>REFRESH</button>
//       </>
//     );
// };

// export async function getStaticPaths(){
//     const query = `SELECT table_name FROM all_tables WHERE owner='HR'`;
//     const result = await getTables(query);

//     const paths = result.rows.map(([table]) => {
//         return {
//           params: {
//             tableName: table
//           }
//         };
//       })

//     return {
//         fallback: 'blocking',
//         paths
//       };
// }

// // export async function getServerSideProps(context) {
// //     const tableName = context.params.tableName;
// //     const res = await fetch(`http://localhost:3000/api/${tableName}`);
// //     const data = await res.json();
// //     console.log('--------------------------------------------------------------');
// //     return {
// //       props: {
// //         data
// //       }
// //     };
// // }

// export async function getStaticProps(context) {
//     const tableName = context.params.tableName;
//     const res = await fetch(`http://localhost:3000/api/${tableName}`);
//     const result = await res.json();

//     console.log('-----------------------------------------------------');
//     return {
//         props: {
//         data: result,
//         },
//         revalidate: 1,
//     };
// }

// export default Table;
