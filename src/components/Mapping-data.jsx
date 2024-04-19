const MappingData = ({ data }) => {
console.log(data,'datadata');
  if(!data)return <h1>loading...</h1>
  return (
    <>
      {data?.map((obj, i) => {
        const keys = Object.keys(obj);

        return (
          <div key={i}>
            {keys.map((key, index) => (
              <div key={index}>
                {typeof obj[key] === 'object' ? (
                  // If the value is an object, stringify it for display
                  <p key={index}>
                    {/* {key}: {JSON.stringify(obj[key])} */}
                  </p>
                ) : (
                  // Otherwise, render the key-value pair directly
                  <p key={index}>
                    <strong>{key.toUpperCase()}</strong>: {obj[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default MappingData;
