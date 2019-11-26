    node ../../scripts/increment_android_ios_version/index.js version_name:1.3.5 build_number:git

version / build

    node ../../scripts/increment_android_ios_version/index.js version_src:package.json
    
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
