window.addEventListener('DOMContentLoaded', async () => {
    const graphqlResponseElement = document.querySelector('#graphql_response');

    if (!graphqlResponseElement)
        return console.error('Element not found');

    const initializeGraphqlResponseElement = () => {
        graphqlResponseElement.textContent = 'Fetching...';
    };

    const fetchGreeting = async () => {
        const response =  await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                query: `
                    query { 
                        greeting 
                    }
                `
            })
        });
        const data = await response.json();

        if(data.hasOwnProperty('error'))
            throw new Error(data.error)
            
        renderResponseInGraphqlResponseElement(data as GraphqlResponse);
        
    }
    type GraphqlResponse = {
        data: {
            greeting: string
        }
    };
    const renderResponseInGraphqlResponseElement = (response: GraphqlResponse) => {
        graphqlResponseElement.textContent = response.data.greeting;
    }

    initializeGraphqlResponseElement();
    await fetchGreeting();
});