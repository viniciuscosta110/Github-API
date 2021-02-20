import React, {useState} from 'react';
import {View, Text, StatusBar, Linking, TouchableOpacity} from 'react-native';
import {SearchBar, Image} from 'react-native-elements';
import {RectButton, ScrollView} from 'react-native-gesture-handler';


import styles from './styles';

import IGithubRepo from './IGithubRepo';

const Index: React.FC = () => {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<IGithubRepo[]>([]);
  const [error, setError] = useState('');

  function handleTextChange(event_text: string) {
    setUsername(event_text);
  }
  
  async function apiSearch() {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    if (repos.message) {
      setRepositories([])
      setError(`Usuário ${username} não encontrado!`);
    } else {
      setRepositories(repos);
      setError('');
    }
  }

  return (
    <View style={styles.mainContainer} accessible={true}>
      <StatusBar
        barStyle = "dark-content"
        hidden = {false}
        backgroundColor = "#E5E6f0"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />

      <SearchBar
      lightTheme = {false}
      containerStyle={{
        backgroundColor: "#24292e",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        width: '100%'
      }}
      onChangeText = {handleTextChange}
      value = {username}
      placeholder = "Type a github username"
      />

      <TouchableOpacity onPress={apiSearch} style={styles.searchButton}>
        <Text style={{color: "#eee"}}>Search</Text>
      </TouchableOpacity>
      
      {
        <Text style={{color: '#9b0000', marginTop: 20, textAlign: 'center'}}>{error}</Text>
      }
      
      <ScrollView>
          {
            repositories.map((repo: IGithubRepo) => {
              let languageName = null;
              let color = null;
              
              if (repo.language) {
                languageName = repo.language
                .toLowerCase()
                .replace(' ', '_');
              }

              return (
                <TouchableOpacity 
                  key={repo.name}
                  onPress={() => Linking.openURL(repo.html_url)}
                  style={styles.repo}
                  accessible={true}
                >
                  <Image 
                    source={{
                      uri: repo.owner.avatar_url
                    }}
                    style={styles.avatar}
                    accessible={true}
                  />

                  <Text style={{fontWeight: 'bold'}} >
                    {repo.name}
                  </Text>
                  <View accessible={true}>
                    <Text style={styles.bio}>
                      {repo.description ?? 'Sem descrição'}
                    </Text>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                      <Text style={{color: '#444'}}>
                        {repo.language ?? 'Sem linguagem'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          }
      </ScrollView>
    </View>
  );
}

export default Index;