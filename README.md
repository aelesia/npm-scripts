    npx @siliconjungles/rn-scripts increment version_name:1.3.5 build_number:123456
    
    npx @siliconjungles/rn-scripts increment version_src:package.json build_src:git
    
params:
    
    {
        build_src?: ['git']
        
        version_src?: ['package.json']
        
        gradle_path?: string 
        // android/app/build.gradle
        
        xcode_path?: string
        
        platform?: ['android', 'ios', 'both'] 
        // defaults to both
        
        version_suffix?: string 
        // alpha
        
        build_number?: number 
        // 90340
        
        version_name?: string 
        // 2.1.5
    }


# npm

## local testing

    npm link
    
    npx @siliconjungles/rn-scripts
