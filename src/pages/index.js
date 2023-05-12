import Wrapper from "../../components/wrapper/Wrapper";

const APP = (props) => {
  return <Wrapper props={props} />;
};
export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/api/regions`);
  const result = await res.json();
  console.log("-----------------------------------------------------");
  return {
    props: {
      data: result,
    },
    revalidate: 1,
  };
}

export default APP;

// export async function getStaticPaths() {
//   const query = `SELECT table_name FROM all_tables WHERE owner='HR'`;
//   const result = await getTables(query);

//   const paths = result.rows.map(([table]) => {
//     return {
//       params: {
//         tableName: table,
//       },
//     };
//   });

//   return {
//     fallback: "blocking",
//     paths,
//   };
// }
