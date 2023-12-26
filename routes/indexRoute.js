const express = require('express');
const router = express.Router();
const axios = require ("axios")

router.get('/graph',async (req,res)=>{

    const username = req.query.username

    try {
        const githubToken =process.env.GIT_TOKEN;
        if (!username) {
            
            return res.status(401).send("username is required")

        }
        // GraphQL query to get the user's contribution data
        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;
    
        const apiUrl = 'https://api.github.com/graphql';
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${githubToken}`
        };
    
        // Send POST request to GitHub GraphQL API using Axios
        const response = await axios.post(apiUrl, { query }, { headers });
       // console.log(response)
    
        if (response.status >= 400) {
         return res.status(400).json(`GitHub API error: ${response.statusText}`);
        }
    
        const data = response.data;
        const contributionData = data.data?.user?.contributionsCollection?.contributionCalendar || {};
      
        res.render("index",{username , contribution_data:`${JSON.stringify(contributionData)}`})
    
      } catch (error) {
        // Handle errors
        console.error(`Error: ${error.message}`);
      }
})

module.exports = router;