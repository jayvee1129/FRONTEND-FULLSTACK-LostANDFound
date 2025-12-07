import { StyleSheet } from 'react-native';

export const welcomeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#007AFF',
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    marginLeft: -50,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  howItWorks: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },
  howTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  howStep: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export const addItemStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 },
  btn: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', marginHorizontal: 5 },
  activeLost: { backgroundColor: '#d9534f', borderColor: '#d9534f' },
  activeFound: { backgroundColor: '#5cb85c', borderColor: '#5cb85c' },
  btnText: { fontWeight: 'bold', color: '#000' },
  imageContainer: { alignItems: 'center', marginVertical: 15 },
  imagePreview: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  removeImageBtn: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5 },
  removeImageText: { color: '#fff', fontWeight: 'bold' },
  uploadBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, marginTop: 10 },
  uploadBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export const detailStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  detailImage: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
  status: { color: 'gray', textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 20, lineHeight: 24 },
  contact: { fontSize: 14, fontStyle: 'italic', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 }
});

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 10 },
  cardRow: { backgroundColor: 'white', padding: 12, marginBottom: 10, borderRadius: 10, elevation: 2, flexDirection: 'row', alignItems: 'center' },
  leftThumbWrap: { marginRight: 12 },
  thumb: { width: 72, height: 72, borderRadius: 8, backgroundColor: '#eee' },
  contentRight: { flex: 1, justifyContent: 'center' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#222', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, overflow: 'hidden', color: 'white', fontSize: 12, marginLeft: 8 },
  lost: { backgroundColor: '#d9534f' },
  found: { backgroundColor: '#5cb85c' },
  subtitle: { color: '#666', marginTop: 4 },
  date: { color: '#999', fontSize: 12, marginTop: 6 },
  cardNoImage: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2 },
  cardLabel: { fontSize: 12, color: '#999', fontWeight: '600', marginTop: 8, marginBottom: 2 },
  cardValue: { fontSize: 16, fontWeight: '700', color: '#222' },
  cardDate: { fontSize: 12, color: '#999', marginBottom: 0 },
  statusBadgeText: { fontWeight: '700', fontSize: 12 },
  lostText: { color: '#d9534f' },
  foundText: { color: '#5cb85c' },
});

export default {
  welcomeStyles,
  addItemStyles,
  detailStyles,
  homeStyles,
};
