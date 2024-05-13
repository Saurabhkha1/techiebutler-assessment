const makeNetworkCall = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    throw new Error('An error occured!');
  }
};

export {makeNetworkCall};
