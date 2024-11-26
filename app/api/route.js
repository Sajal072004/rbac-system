
export async function GET(req) {
  try {

    return new Response(
      JSON.stringify({ message: 'GET request to /api is working' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in test GET route:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process GET request' }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    
    return new Response(
      JSON.stringify({ message: 'POST request to /api is working' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in test POST route:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process POST request' }),
      { status: 500 }
    );
  }
}
