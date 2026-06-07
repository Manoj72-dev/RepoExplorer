export function sortRepos(repos, sortBy){
    const sorted = [...repos]
    switch(sortBy){
        case "updated":
            return sorted.sort(
                (a,b) => 
                    new Date(b.updated_at) - 
                    new Date(a.updated_at)
            );
        
        case "star":
            return sorted.sort(
                (a,b) => 
                    b.stargazers_count - 
                    a.stargazers_count
            );
        
        case "name": 
            return sorted.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );
        
        default:
            return sorted;
    }
}