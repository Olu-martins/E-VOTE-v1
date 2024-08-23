export const ElectionResults = () => {
// console.log("##########$%%^&*&",results);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("GroupAId");
    localStorage.removeItem("GroupBId");
    localStorage.removeItem("GroupCId");
    localStorage.removeItem("token")
    window.location.href = "/";
}

const electionData = {
  categoryOne: [
      { name: "Alice Johnson", votes: 1200 },
      { name: "Bob Smith", votes: 950 },
      { name: "Bob Smith", votes: 950 },
  ],
  categoryTwo: [
      { name: "Carol Williams", votes: 800 },
      { name: "David Brown", votes: 650 },
      { name: "Carol Williams", votes: 800 },
  ],
  categoryThree: [
      { name: "Eve Davis", votes: 400 },
      { name: "Frank Miller", votes: 350 },
      { name: "Eve Davis", votes: 400 },
  ],
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col mx-auto justify-center items-center h-[95%] w-[90%] xl:w-[60%] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Election Results
        </h2>

        {/* Category One */}
        <div className="w-full  mb-3">
          <h3 className="text-xl font-semibold text-white text-[1vw]  bg-blue-600 py-1rounded-t-md">
            Category One Results
          </h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-1 px-4 text-[1vw] border-b">Candidate Name</th>
                <th className="py-1 px-4 text-[1vw] border-b">Number of Votes</th>
              </tr>
            </thead>
            <tbody>
              {electionData?.categoryOne?.map((candidate:any, index:any) => (
                <tr
                  key={index}
                  className="text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-1 px-4 border-b text-[1vw]">{candidate.name}</td>
                  <td className="py-1 px-4 border-b text-[1vw]">{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Divider Line */}
        <hr className="w-full border-gray-300 mb-6" />

        {/* Category Two */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-semibold text-white text-[1vw]  bg-green-600 py-1rounded-t-md">
            Category Two Results
          </h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-green-100">
                <th className="py-1 text-[1vw] px-4 border-b">Candidate Name</th>
                <th className="py-1 text-[1vw] px-4 border-b">Number of Votes</th>
              </tr>
            </thead>
            <tbody>
              {electionData?.categoryTwo?.map((candidate:any, index:any) => (
                <tr
                  key={index}
                  className="text-gray-700 hover:bg-green-50 transition-colors"
                >
                  <td className="py-1 px-4 text-[1vw] border-b">{candidate.name}</td>
                  <td className="py-1 px-4 text-[1vw] border-b">{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Divider Line */}
        <hr className="w-full border-gray-300 mb-6" />

        {/* Category Three */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-semibold text-white text-[1vw]  bg-red-600 py-1rounded-t-md">
            Category Three Results
          </h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-red-100">
                <th className="py-1 text-[1vw] px-4 border-b">Candidate Name</th>
                <th className="py-1 text-[1vw] px-4 border-b">Number of Votes</th>
              </tr>
            </thead>
            <tbody>
              {electionData?.categoryThree?.map((candidate:any, index:any) => (
                <tr
                  key={index}
                  className="text-gray-700 hover:bg-red-50 transition-colors"
                >
                  <td className="py-1 text-[1vw] px-4 border-b">{candidate.name}</td>
                  <td className="py-1 text-[1vw] px-4 border-b">{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};